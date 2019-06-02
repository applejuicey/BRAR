# FROM HERE STARTS THE CORE CODES:
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------

# ----------------------------------------------------------
# a function which implements the conjugate analysis of the beta priors, using
# prior: beta + likelihood: binomial = posterior: beta
# PARAM:
#   beta_param_vector_list: a list of 4 vectors, of which each contains beta prior distribution parameters(a, b) for both arms
#   sample_data_vector_list: a list of 4 vectors, of which each contains the sample data(number of positives and negatives) for both arms
#   subscript: the subscript of the vectors
# RETURN:
#   beta_param_vector: a vector which saves updated beta distribution params
beta_conjugate_analysis_implementation <- function(beta_param_vector_list, sample_data_vector_list, subscript) {
  arm1_beta_a <- beta_param_vector_list[[1]][subscript] + sample_data_vector_list[[1]][subscript]
  arm1_beta_b <- beta_param_vector_list[[2]][subscript] + sample_data_vector_list[[2]][subscript]
  arm2_beta_a <- beta_param_vector_list[[3]][subscript] + sample_data_vector_list[[3]][subscript]
  arm2_beta_b <- beta_param_vector_list[[4]][subscript] + sample_data_vector_list[[4]][subscript]
  beta_param_vector <- c(arm1_beta_a, arm1_beta_b, arm2_beta_a, arm2_beta_b)
  return(beta_param_vector)
}
# ----------------------------------------------------------
# a function which solves beta random inequality
# PARAM: 
#   beta_param_vector_list:a list of 4 vectors, of which each contains beta prior distribution parameters(a, b) for both arms
#   delta: a user specified additional accuracy
#   subscript: the subscript of the vectors
# RETURN: 
#   result_probability: the probability answer of the inequality
beta_random_inequality_solver <- function(beta_param_vector_list, delta, subscript) {
  beta_integrand <- function(x) {
    dbeta(x, beta_param_vector_list[[1]][subscript], beta_param_vector_list[[2]][subscript]) * pbeta(x - delta, beta_param_vector_list[[3]][subscript], beta_param_vector_list[[4]][subscript])
  }
  result_probability <- integrate(beta_integrand, delta, 1, rel.tol=1e-4)$value
  return(result_probability)
}
# ----------------------------------------------------------
# a function which calculates the new allocation probabilities to each arm according to algorithm1
# PARAM: 
#   inequaility_result_vector_list: the probabilties solved from the random inequalities
#   probability_arm1_bigger, probability_arm2_bigger: the probabilties solved from the random inequalities above
#   current_sample_size: the number of subjects allocated until now
#   maxium_sample_size: the total number of subjects to be enrolled in the trial
#   subscript: the subscript of the vectors
# RETURN: 
#   allocation_probability_vector: a vector contains the two allocation probabilities
allocation_probability_solver1 <- function(inequaility_result_vector_list, current_sample_size, maxium_sample_size, subscript)  {
  tuning_parameter <- 1
  # tuning_parameter <- current_sample_size / (2 * maxium_sample_size)
  allocation_probability_to_arm1 <- (inequaility_result_vector_list[[1]][subscript] ^ tuning_parameter) / ((inequaility_result_vector_list[[1]][subscript] ^ tuning_parameter) + (inequaility_result_vector_list[[2]][subscript] ^ tuning_parameter))
  allocation_probability_to_arm2 <- (inequaility_result_vector_list[[2]][subscript] ^ tuning_parameter) / ((inequaility_result_vector_list[[1]][subscript] ^ tuning_parameter) + (inequaility_result_vector_list[[2]][subscript] ^ tuning_parameter))
  allocation_probability_vector <- c(allocation_probability_to_arm1, allocation_probability_to_arm2)
  return(allocation_probability_vector)
}
# ----------------------------------------------------------
# a function which generates the allocation result(s) for a subject(s)
# PARAM: 
#   allocation_probability_vector_list: the probabilties solved from the allocation_probability_solver1 above
#   subject_number: the number of subjects waiting to be assigned
#   subscript: the subscript of the vectors
# RETURN: 
#   smaller_ones_vector
nonequal_allocation_implementation <- function(allocation_probability_vector_list, subject_number, subscript) {
  random_number_vector <- runif(subject_number, 0, 1)
  # "TRUE" in smaller_ones_vector means to allocate to "arm1":
  smaller_ones_vector <- random_number_vector <= allocation_probability_vector_list[[1]][subscript]
  return(smaller_ones_vector)
}
# ----------------------------------------------------------
# a function which generates the simulation sample data
# PARAM: 
#   allocation_number_vector_list: a list which save the number of subjects assigned to each arm
#   arm1_response_rate, arm2_response_rate: the user specified response rates for two arms
#   subscript: the subscript of the vectors
# RETURN: 
#   sample_data_vector
sample_data_generator <- function(allocation_number_vector_list, arm1_response_rate, arm2_response_rate, subscript) {
  arm1_positive_number <- rbinom(1, allocation_number_vector_list[[1]][subscript], arm1_response_rate)
  arm1_negative_number <- allocation_number_vector_list[[1]][subscript] - arm1_positive_number
  arm2_positive_number <- rbinom(1, allocation_number_vector_list[[2]][subscript], arm2_response_rate)
  arm2_negative_number <- allocation_number_vector_list[[2]][subscript] - arm2_positive_number
  sample_data_vector <- c(arm1_positive_number, arm1_negative_number, arm2_positive_number, arm2_negative_number)
  return(sample_data_vector)
}





# PARAMETERS NEEDED IN THE INNER ITERATION:
# ----------------------------------------------------------
# the maxium number of subjects to be enrolled in the study
maxium_sample_size <- 60
# ----------------------------------------------------------
# the allocation update frequncy:
allocation_update_frequncy <- 1
# ----------------------------------------------------------
# number of subjects to be assigned in the equal randomization stage
burn_in_period_length <- 14
# ----------------------------------------------------------
# iteration starts from (burn_in_period_length + 1) and ends at (maxium_sample_size), with step equals to (allocation_update_frequncy):
iteration_vector <- seq((burn_in_period_length + 1), (maxium_sample_size + 1), allocation_update_frequncy)
iteration_vector
# ----------------------------------------------------------
# trial stopping criteria:
early_winner_cutoff <- 0.975
early_loser_cutoff <- 0.025
# TOBEDONE: ADD FULTILITY CRETERIA HERE
final_winner_cutoff <- 0.9
# ----------------------------------------------------------
# arm1 response rate:
arm1_response_rate <- 0.55
# arm2 response rate:
arm2_response_rate <- 0.7
# ----------------------------------------------------------

# PARAMETERS NEEDED IN THE OUTER ITERATION:
# ----------------------------------------------------------
# how many times the trial should be simulated:
trial_simulation_number <- 1000
# why the trial is stopped(in each vector 0 means no while 1 means yes): 
#   1. reached the maxium_sample_size
trial_stop_reason1_vector <- numeric(trial_simulation_number)
#   2. arm1 satisfies the final_winner criterion
trial_stop_reason2_vector <- numeric(trial_simulation_number)
#   3. arm2 satisfies the final_winner criterion
trial_stop_reason3_vector <- numeric(trial_simulation_number)
#   4. arm1 satisfies the early_winner criterion
trial_stop_reason4_vector <- numeric(trial_simulation_number)
#   5. arm2 satisfies the early_winner criterion
trial_stop_reason5_vector <- numeric(trial_simulation_number)
#   6. arm1 satisfies the early_loser criterion
trial_stop_reason6_vector <- numeric(trial_simulation_number)
#   7. arm2 satisfies the early_loser criterion
trial_stop_reason7_vector <- numeric(trial_simulation_number)
#   8. fultility TOBEDONE
# trial_stop_reason8_vector <- numeric(trial_simulation_number)

# the current sample size
sample_size_vector <- numeric(trial_simulation_number)
# the positive and negative subject numbers in each arm
arm1_positive_number_vector <- numeric(trial_simulation_number)
arm1_negative_number_vector <- numeric(trial_simulation_number)
arm2_positive_number_vector <- numeric(trial_simulation_number)
arm2_negative_number_vector <- numeric(trial_simulation_number)
# ----------------------------------------------------------


# what needed to be done in the outer iteration:
#   1. set the parameters to initial values for the next generation of the simulation 
#   2. simulate the trial via inner iteration
#   3. record the trial results
for (j in 1:trial_simulation_number) {
  
  # ----------------------------------------------------------
  # what parameters needed to be set to initial values for the next generation of the simulation 
  # ----------------------------------------------------------
  # 4 vectors which save the (a,b)s of the two beta distributions:
  arm1_a_vector <- numeric(length(iteration_vector) + 1)
  arm1_b_vector <- numeric(length(iteration_vector) + 1)
  arm2_a_vector <- numeric(length(iteration_vector) + 1)
  arm2_b_vector <- numeric(length(iteration_vector) + 1)
  # combine those 4 vectors in a list:
  beta_param_vector_list <- list(arm1_a_vector, arm1_b_vector, arm2_a_vector, arm2_b_vector)
  # assign initial values for beta_param_vector_list according to the equal randomization stage settings
  beta_param_vector_list[[1]][1] <- 13.0625
  beta_param_vector_list[[2]][1] <- 10.6875
  beta_param_vector_list[[3]][1] <- 7.57101
  beta_param_vector_list[[4]][1] <- 2.52367
  # ----------------------------------------------------------
  # 4 vectors which save the sample data of the two arms:
  arm1_positive_vector <- numeric(length(iteration_vector) + 1)
  arm1_negative_vector <- numeric(length(iteration_vector) + 1)
  arm2_positive_vector <- numeric(length(iteration_vector) + 1)
  arm2_negative_vector <- numeric(length(iteration_vector) + 1)
  # combine those 4 vectors in a list:
  sample_data_vector_list <- list(arm1_positive_vector, arm1_negative_vector, arm2_positive_vector, arm2_negative_vector)
  # assign initial values for sample_data_vector_list according to the equal randomization stage simulation results
  sample_data_vector_list[[1]][1] <- rbinom(1, burn_in_period_length/2, arm1_response_rate)
  sample_data_vector_list[[2]][1] <- burn_in_period_length/2 - sample_data_vector_list[[1]][1]
  sample_data_vector_list[[3]][1] <- rbinom(1, burn_in_period_length/2, arm2_response_rate)
  sample_data_vector_list[[4]][1] <- burn_in_period_length/2 - sample_data_vector_list[[3]][1]
  # ----------------------------------------------------------
  # 2 vectors which save the result of random inequalities:
  arm1_bigger_vector <- numeric(length(iteration_vector))
  arm2_bigger_vector <- numeric(length(iteration_vector))
  # combine those 2 vectors in a list:
  inequaility_result_vector_list <- list(arm1_bigger_vector, arm2_bigger_vector)
  # ----------------------------------------------------------
  # 2 vectors which save the allocation probabilities to each arm:
  to_arm1_probability_vector <- numeric(length(iteration_vector))
  to_arm2_probability_vector <- numeric(length(iteration_vector))
  # combine those 2 vectors in a list:
  allocation_probability_vector_list <- list(to_arm1_probability_vector, to_arm2_probability_vector)
  # ----------------------------------------------------------
  # 2 vectors which save the allocated subject numbers to each arm:
  to_arm1_number_vector <- numeric(length(iteration_vector))
  to_arm2_number_vector <- numeric(length(iteration_vector))
  # combine those 2 vectors in a list:
  allocation_number_vector_list <- list(to_arm1_number_vector, to_arm2_number_vector)
  # ----------------------------------------------------------
  
  # ----------------------------------------------------------
  # what needed to be done in the inner iteration:
  #   1. update the distributions of those two rates
  #   2. solve the random inequalities 
  #   3. whether the current simulation trial can be stopped or not
  #   4. calculate the allocation probabilities
  #   5. generate the allocation result
  #   6. generate the sample data
  for (i in 1:length(iteration_vector)) {
    # ----------------------------------------------------------
    #   1. update the distributions of those two rates, save the results
    temp0 <- beta_conjugate_analysis_implementation(beta_param_vector_list, sample_data_vector_list, i)
    beta_param_vector_list[[1]][i + 1] <- temp0[1]
    beta_param_vector_list[[2]][i + 1] <- temp0[2]
    beta_param_vector_list[[3]][i + 1] <- temp0[3]
    beta_param_vector_list[[4]][i + 1] <- temp0[4]
    # ----------------------------------------------------------
    #   2. solve the random inequalities, save the results
    inequaility_result_vector_list[[1]][i] <- beta_random_inequality_solver(beta_param_vector_list, 0, i + 1)
    inequaility_result_vector_list[[2]][i] <- 1 - inequaility_result_vector_list[[1]][i]
    # ----------------------------------------------------------
    #   3. whether the current simulation trial can be stopped or not, save the results
    #   why the trial is stopped: 1.maxium_sample_size\2n.early_winner\3n.early_loser\4n.final_winner\5n.fultility
    # when the number of subjects enrolled reaches the maxium_sample_size, stop the trial and decide the final winner
    # record the reason for the termination
    if(i == length(iteration_vector)) {
      if(inequaility_result_vector_list[[1]][i] > final_winner_cutoff) {
        trial_stop_reason2_vector[j] <- 1
      }
      if(inequaility_result_vector_list[[2]][i] > final_winner_cutoff) {
        trial_stop_reason3_vector[j] <- 1
      }
      trial_stop_reason1_vector[j] <- 1
      break
    }
    # when the probabilities in the allocation_probability_vector_list meet certain criteria, jump out of the loop
    # and record the reason for the termination
    flag <- FALSE
    if(inequaility_result_vector_list[[1]][i] > early_winner_cutoff) {
      trial_stop_reason4_vector[j] <- 1
      flag <- TRUE
    }
    if(inequaility_result_vector_list[[2]][i] > early_winner_cutoff) {
      trial_stop_reason5_vector[j] <- 1
      flag <- TRUE
    }
    if(inequaility_result_vector_list[[1]][i] < early_loser_cutoff) {
      trial_stop_reason6_vector[j] <- 1
      flag <- TRUE
    }
    if(inequaility_result_vector_list[[2]][i] < early_loser_cutoff) {
      trial_stop_reason7_vector[j] <- 1
      flag <- TRUE
    }
    if(flag == TRUE) {
      break
    }
    # ----------------------------------------------------------
    #   4. calculate the allocation probabilities according to specific algorithm
    temp1 <- allocation_probability_solver1(inequaility_result_vector_list, 1, 1, i)
    allocation_probability_vector_list[[1]][i] <- temp1[1]
    allocation_probability_vector_list[[2]][i] <- temp1[2]
    # ----------------------------------------------------------
    #   5. generate the allocation result
    temp2 <- nonequal_allocation_implementation(allocation_probability_vector_list, allocation_update_frequncy, i)
    allocation_number_vector_list[[1]][i] <- length(temp2[temp2])
    allocation_number_vector_list[[2]][i] <- length(temp2) - length(temp2[temp2])
    # ----------------------------------------------------------
    #   6. generate the sample data
    temp3 <- sample_data_generator(allocation_number_vector_list, arm1_response_rate, arm2_response_rate, i)
    sample_data_vector_list[[1]][i + 1] <- temp3[1]
    sample_data_vector_list[[2]][i + 1] <- temp3[2]
    sample_data_vector_list[[3]][i + 1] <- temp3[3]
    sample_data_vector_list[[4]][i + 1] <- temp3[4]
    # ----------------------------------------------------------
  }
  # ----------------------------------------------------------
  
  # ----------------------------------------------------------
  # what needed to be recorded when the trial end:
  #   1. the current sample size
  # I AM NOT SURE WHETHER VARIABLE SCOPE EXISTS IN R???
  sample_size_vector[j] <- iteration_vector[i] - 1
  #   2. the positive and negative subject numbers in each arm
  arm1_positive_number_vector[j] <- sum(sample_data_vector_list[[1]])
  arm1_negative_number_vector[j] <- sum(sample_data_vector_list[[2]])
  arm2_positive_number_vector[j] <- sum(sample_data_vector_list[[3]])
  arm2_negative_number_vector[j] <- sum(sample_data_vector_list[[4]])
  # ----------------------------------------------------------
  
}

trial_stop_reason1_vector
trial_stop_reason2_vector
trial_stop_reason3_vector
trial_stop_reason4_vector
trial_stop_reason5_vector
trial_stop_reason6_vector
trial_stop_reason7_vector
arm1_positive_number_vector
arm1_negative_number_vector
arm2_positive_number_vector
arm2_negative_number_vector
sample_size_vector
mean(sample_size_vector)

# probabilty of select arm1 finally(including early):
mean(trial_stop_reason2_vector == 1) + mean(trial_stop_reason4_vector == 1)
# probabilty of select arm2 finally(including early):
mean(trial_stop_reason3_vector == 1) + mean(trial_stop_reason5_vector == 1)
# probabilty of select arm1 early:
mean(trial_stop_reason4_vector == 1)
# probabilty of select arm2 early:
mean(trial_stop_reason5_vector == 1)
# probabilty of stop arm1 early:
mean(trial_stop_reason6_vector == 1)
# probabilty of stop arm2 early:
mean(trial_stop_reason7_vector == 1)
# mean of subjects in arm1
mean(arm1_positive_number_vector + arm1_negative_number_vector)
# median,2.5%,97.5% of subjects in arm1
quantile((arm1_positive_number_vector + arm1_negative_number_vector), c(0.5, 0.025, 0.975), type=3)
# mean of subjects in arm2
mean(arm2_positive_number_vector + arm2_negative_number_vector)
# median,2.5%,97.5% of subjects in arm2
quantile((arm2_positive_number_vector + arm2_negative_number_vector), c(0.5, 0.025, 0.975), type=3)



