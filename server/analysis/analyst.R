args <- commandArgs(T)

analyst <- function (
  decisionStrategy,
  earlyDropThreshold,
  earlyWinnerThreshold,
  clinicalSignificanceThreshold,
  clinicalSignificanceValue,
  constructionMethod,
  adjustmentMethod1,
  adjustmentMethod2,
  adjustmentMethod3,
  burnInBlockNumber,
  burnInBlockLength,
  tuningParameterType,
  tuningParameterValue,
  clipMethodMinimumThreshold,
  armNumber,
  maximumSampleSize,
  adaptiveBlockNumber,
  adaptiveBlockLength,
  currentSubjectNumber,
  betaPriorParameterA,
  betaPriorParameterB,
  numberOfSuccesses,
  numberOfFailures
) {
  set.seed(123)
  if (adjustmentMethod1 == 'true' & currentSubjectNumber <= burnInBlockNumber * burnInBlockLength) {
    block <- rep(1:burnInBlockNumber, each = burnInBlockLength)
    a1 <- data.frame(block, rand = runif(length(block)), envelope = 1:length(block))
    a2 <- a1[order(a1$block, a1$rand), ]
    a2$group <- rep(1:armNumber, times = length(block) / armNumber)
    assign <- a2[order(a2$envelope), ]
    #print(assign$group)
    return(assign$group[currentSubjectNumber])
  }
  else {
    if (TRUE) {
    #if (constructionMethod == 'constructionMethod2') {
      betaDistParamA <- betaPriorParameterA + numberOfSuccesses
      betaDistParamB <- betaPriorParameterB + numberOfFailures
      sample_matrix <- sapply(1:armNumber, function (arm_id) {
        rbeta(5000, betaDistParamA[arm_id], betaDistParamB[arm_id])
      })
      lambda_per_arm <- numeric(armNumber)
      for (i in 1:armNumber) {
        other_max_sample <- numeric(5000)
        for (j in 1:armNumber) {
          if (j == i) {
            next
          }
          other_max_sample <- pmax(other_max_sample, sample_matrix[,j])
        }
        lambda_per_arm[i] <- mean(sample_matrix[,i] > other_max_sample + clinicalSignificanceThreshold)
      }
      #print(lambda_per_arm)
      if (TRUE) {
      #if (decisionStrategy == 'decisionStrategy1') {
        if (mean(lambda_per_arm > earlyWinnerThreshold) > 0) {
          return('early winner and over')
        }
      }
      else {
        
      }
      if (adjustmentMethod2 == 'true') {
        if (tuningParameterType == 'fixed') {
          allo_prob_raw_per_arm <- lambda_per_arm ^ tuningParameterValue / sum(lambda_per_arm ^ tuningParameterValue)
        } 
        else {
          allo_prob_raw_per_arm <- lambda_per_arm ^ (currentSubjectNumber / (armNumber * maximumSampleSize)) / sum(lambda_per_arm ^ (currentSubjectNumber / (armNumber * maximumSampleSize)))
        }
      }
      else {
        allo_prob_raw_per_arm <- lambda_per_arm
      }
      if (adjustmentMethod3 == 'true') {
        allo_prob_per_arm <- pmax(clipMethodMinimumThreshold, pmin(allo_prob_raw_per_arm, 1 - clipMethodMinimumThreshold))
      }
      else {
        allo_prob_per_arm <- allo_prob_raw_per_arm
      }
      #print(allo_prob_per_arm)
      #print(armNumber)
      adaptive_assign_result_block <- sample(
        1:armNumber,
        size = adaptiveBlockLength,
        replace = TRUE,
        prob = allo_prob_per_arm
      )
      #print(adaptive_assign_result_block)
      index <- (currentSubjectNumber - burnInBlockNumber * burnInBlockLength) %% adaptiveBlockLength
      if (index == 0) {
        return(adaptive_assign_result_block[length(adaptive_assign_result_block)])
      }
      else {
        return(adaptive_assign_result_block[index])
      }
    }
    else {
     
    }
  }

}

number_of_arms <- as.numeric(args[15])

betaPriorParameterA_vector <- numeric(0)
for (i in 1:number_of_arms) {
  betaPriorParameterA_vector <- c(betaPriorParameterA_vector, as.numeric(args[20 + i - 1]))
}

betaPriorParameterB_vector <- numeric(0)
for (i in 1:number_of_arms) {
  betaPriorParameterB_vector <- c(betaPriorParameterB_vector, as.numeric(args[20 + number_of_arms + i - 1]))
}

numberOfSuccesses_vector <- numeric(0)
for (i in 1:number_of_arms) {
  numberOfSuccesses_vector <- c(numberOfSuccesses_vector, as.numeric(args[20 + 2 * number_of_arms + i - 1]))
}

numberOfFailures_vector <- numeric(0)
for (i in 1:number_of_arms) {
  numberOfFailures_vector <- c(numberOfFailures_vector, as.numeric(args[20 + 3 * number_of_arms + i - 1]))
}

analyst(
  decisionStrategy = args[1],
  earlyDropThreshold = as.numeric(args[2]),
  earlyWinnerThreshold = as.numeric(args[3]),
  clinicalSignificanceThreshold = as.numeric(args[4]),
  clinicalSignificanceValue = as.numeric(args[5]),
  constructionMethod = args[6],
  adjustmentMethod1 = args[7],
  adjustmentMethod2 = args[8],
  adjustmentMethod3 = args[9],
  burnInBlockNumber = as.numeric(args[10]),
  burnInBlockLength = as.numeric(args[11]),
  tuningParameterType = args[12],
  tuningParameterValue = as.numeric(args[13]),
  clipMethodMinimumThreshold =as.numeric(args[14]),
  armNumber = as.numeric(args[15]),
  maximumSampleSize = as.numeric(args[16]),
  adaptiveBlockNumber = as.numeric(args[17]),
  adaptiveBlockLength = as.numeric(args[18]),
  currentSubjectNumber = as.numeric(args[19]),
  betaPriorParameterA = betaPriorParameterA_vector,
  betaPriorParameterB = betaPriorParameterB_vector,
  numberOfSuccesses = numberOfSuccesses_vector,
  numberOfFailures = numberOfFailures_vector
)