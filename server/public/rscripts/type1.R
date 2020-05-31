args <- commandArgs(T)

# 随机数种子
random_seed <- as.numeric(args[17])
# 模拟次数
simulation_number <- as.numeric(args[16])
# 每次模拟试验的处理组数量
arm_number <- as.numeric(args[1])
# 时间趋势函数的系数
drift_coefficient_arg_vector <- numeric(arm_number * 2)
for (i in 1:arm_number) {
  drift_coefficient_arg_vector[i * 2 - 1] <- as.numeric(unlist(strsplit(args[12], split=',')))[i]
  drift_coefficient_arg_vector[i * 2] <- as.numeric(unlist(strsplit(args[13], split=',')))[i]
}
# 渐入期区组数量
burnin_block_number <- as.numeric(args[2])
# 渐入期区组长度（必须是处理组数量的整数倍，建议与适应期区组长度一致）
burnin_block_length <- as.numeric(args[3])
# 适应期区组数量
adaptive_block_number <- as.numeric(args[4])
# 适应期区组长度
adaptive_block_length <- as.numeric(args[5])
# lambda的最小值（大于等于0，小于0.5）
lambda_minimum_value <- as.numeric(args[18])
# 解随机变量不等式时所需的delta（即临床显著界值）
inequality_solver_delta <- as.numeric(args[11])
# 早期无效废弃阈值
early_drop_threshold <- as.numeric(args[8])
# 早期有效判定阈值（需大于最终成功阈值）
early_winner_threshold <- as.numeric(args[9])
# 最终成功阈值（必须大于0.5，小于1）
final_winner_threshold <- as.numeric(args[10])
# 调节参数类型
tunning_parameter_type <- as.numeric(args[19])
# 调节参数取值
tunning_parameter_value <- as.numeric(args[20])
# 各处理组响应率beta先验分布的参数a、b
beta_prior_a_arg_vector <- numeric(arm_number)
beta_prior_b_arg_vector <- numeric(arm_number)
for (i in 1:arm_number) {
  beta_prior_a_arg_vector[i] <- as.numeric(unlist(strsplit(args[14], split=',')))[i]
  beta_prior_b_arg_vector[i] <- as.numeric(unlist(strsplit(args[15], split=',')))[i]
}
# 该病所有患者数量
patient_horizon <- as.numeric(args[7])
# 推广期区组长度（必须是处理组数量的整数倍，建议与适应期区组长度一致）
generalisation_block_length <- as.numeric(args[6])


print(beta_prior_a_arg_vector)
print(beta_prior_b_arg_vector)
print(drift_coefficient_arg_vector)