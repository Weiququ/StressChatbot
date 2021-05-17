/*
 * @Author: your name
 * @Date: 2020-11-22 18:35:52
 * @LastEditTime: 2021-02-20 15:41:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\util\constant.ts
 */
// export const ApiUrl = 'http://stresschatbot.cn:8000'
// export const ApiUrl = 'http://127.0.0.1:5000';   
export const ApiUrl = 'https://stresschatbot.cn/api' 
export const RasaApiUrl = 'https://stresschatbot.cn/rasa/'
// export const RasaApiUrl = 'http://stresschatbot.cn:5005/webhooks/rest/webhook'
// export const RasaApiUrl = 'http://localhost:5005/webhooks/rest/webhook'


// export const GarminApiUrl = 'http://localhost:8081/'
export const GarminApiUrl = 'https://stresschatbot.cn/'

export const DOMAIN = {
    STRESS: 'stress',
    SLEEP: 'sleeps',
    DAILY: 'dailies'
}

export const DefaultAvatar = "/assets/icon/default.png"


export const FORMATE_TIME = {
    YEAR_MONTH_DAY_HOUR_MINUTE_SECOND: 'yyyy-MM-dd HH:mm:ss',
    YEAR_MONTH_DAY: 'yyyy-MM-dd',
    HOUR_MINUTE_SECOND: 'HH:mm:ss',
    HOUR_MINUTE: 'HH:mm'
}

export const SLEEP_QUALITY = {
    GOOD: '您昨晚的睡眠很棒！研究表明，优质的睡眠有助于帮助人们从日常和长期压力中恢复，并为整体健康做出积极贡献。',
    BAD: '您昨晚的睡眠不太好，[原因]。睡眠质量差会减弱人的生理活动及其平衡能力, 从而让人难以应对新压力。睡眠不足或睡眠剥夺也可能对机体构成压力威胁, 同时睡眠不好会通过生理变化给人施加压力。',
    JUSTSOSO: 'HRV具有昼夜节律。在正常情况下，应该在放松活动中自然增加，尤其是在副交感神经活动增加的睡眠期间，而在交感神经活动增加的清醒时间减少。'
}

export const SLEEP_KNOWLEDGE = {
    DEEP: '当您进入深度睡眠时，眼睛和肌肉运动会完全停止。心率和呼吸会减慢。此时很难被叫醒，即使被叫醒也是迷糊不清的状态。',
    LIGHT: '浅睡眠是睡眠的第一个阶段。眼球运动和肌肉活动在浅睡眠减慢。这时您的身体已准备好进入深度睡眠。',
    REM: '快速眼动（REM，rapid eye movement）睡眠视为睡眠周期的最终阶段。通常人的梦都发生在快速眼动睡眠阶段。REM睡眠阶段倾向于开始时比较短，整个晚上会变长。',
    AWAKE: '一般而言，连续一整晚的睡眠对身体最好，即醒来时间非常短甚至没有。',
    UNMEASURABLE: '无法测量。为避免接收到不可测量的睡眠数据，请在晚上睡觉时佩戴设备。'
}

export const REASONS_FOR_POOR_SLEEP = {
    SLEEP_SHORT: '睡眠时间太短',
    AWAKENINGS_TOO_MUCH: '睡眠期间醒来次数过多',
    FALLBACK_TOO_LONG: '醒来后再次入睡所需时间较长',
    REM_TOO_MUCH: '快速眼动睡眠时间过长',
    DEEP_TOO_LITTLE: '深睡时间太少'
}

export const EXERCISE = {
    AFTER_EXERCISE: '运动后HRV值会降低，并且运动强度越高，运动后的即时HRV越低，压力值越高'
}

export const OVERALL_DAY_STRESS = {
    CALM_OR_BALANCED: '您今天整体的压力不高。大多数人把压力和消极情绪联系在一起，比如恐惧和焦虑，但压力也可以是积极的、有益的。积极压力是人们对一种具有挑战性但不具威胁性的情况的评估，并有信心解决它。积极的压力可以提高我们做事的动力，让我们集中注意力，表现得更好。',
    INADEQUATE_EXERCISE_STRESSFUL: '您今天大多数时间都处于压力之中，并且运动量较少。研究表明适当的体育锻炼，特别是有氧运动有助于帮助人们从日常和长期压力中恢复，并为整体健康做出积极贡献。',
    ENOUGH_EXERCISE_STRESSFUL: '您今天大多数时间都处于压力之中，运动量较大，休息时间很少。可以多腾出时间休息，进行冥想、深呼吸等放松训练，有利于减轻压力和焦虑感，使身心得到放松。'
}

export const STRESS_QUALIFIER = {
    UNKNOWN: 'unknown',
    CALM: 'calm',
    BALANCED: 'balanced',
    STRESSFUL: 'stressful',
    VERY_STRESSFUL: 'very_stressful',
    CALM_AWAKE: 'calm_awake',
    BALANCED_AWAKE: 'balanced_awake',
    STRESSFUL_AWAKE: 'stressful_awake',
    VERY_STRESSFUL_AWAKE : 'very_stressful_awake'
}

export const DIGESTION = "研究表明，消化食物会引起生理压力，减少副交感神经的活动，使HRV值降低，压力值升高。";

export const CHRONIC_STRESS = "注意到您最近长期处于高压力的状态。大量的科学文献表明，适当的体育活动，宁静的睡眠能帮助日常和长期压力的恢复，以及健康的饮食和适量饮酒对健康都有积极的贡献。";

export const EXERCISE_IS_NOT_ENOUGH = "您上周的中高强度运动量较小，世卫组织建议每周进行150分钟的中高等强度活动。运动是对抗压力的一个关键、重要的方法。运动不仅可以促进整体健康，还可以帮助您控制情绪压力和紧张，帮助放松并改善睡眠。一方面，运动可以让您在情感上暂时摆脱有压力的环境或情景。另一方面，健康的体魄也能提高你应对压力的能力。";

export const RELAX_TIME_DURING_SLEEP = "您昨晚睡眠期间的放松时间较前一晚有变长。研究表明，睡眠期间的放松时间越长，第二天觉察到的工作压力源就越少";

export const IS_HIGH_INTENSITY_EXERCISE_EFFECT_SLEEP = "您昨天的高强度运动有增加。高强度的运动会导致睡眠期间的恢复能力下降，心率增加，HRV降低，从而压力值升高。这并不是要您停止运动，而是要意识到高强度的运动会给身体带来多大的负担，要更好地保持充足的睡眠和休息，进行简单的恢复、放松活动等。"

export const WORK_STRESS = "您昨晚的睡眠时长比前一天短，白天压力均值比前一天高。一项研究表明，睡眠时长与工作压力源呈负相关";

export const ACTIVITY_TYPE = {
    WALKING: 'walking',
    RUNNING: 'running',
    CYCLING: 'cycling',
    FITNESS_EQUIPMENT: 'fitness_equipment'
}

export const ACTIVITY_ICON = {
    WALKING: '/assets/icon/walk.png',
    RUNNING: '/assets/icon/running.png',
    CYCLING: '/assets/icon/cycling.png',
    FITNESS_EQUIPMENT: '/assets/icon/elliptical.png'
}

export const STRESS_VALUE = {
    ACTIVITY: -2,
    UNMEASURABLE: -1
}

export const SCENE_NUMBER = {
    GOOD_SLEEP: 1,
    BAD_SLEEP: 2,
    GENERAL_SLEEP: 3,
    SLEEP_SHORTER_DIURNAL_STRESS_HIGHER: 4,
    SLEEP_LONGER_DIURNAL_STRESS_LOWER: 5,
    MORE_RELAX_TIME_DURING_SLEEP: 6,
    IS_HIGH_INTENSITY_EXERCISE_EFFECT_SLEEP: 7,
    AFTER_EXERCISE: 8,
    INADEQUATE_EXERCISE_STRESSFUL: 9,
    ENOUGH_EXERCISE_STRESSFUL: 10,
    CALM_OR_BALANCED: 11,
    A_WEEK_EXERCISE_IS_NOT_ENOUGH: 12,
    DIGESTION: 13,
    CHRONIC_STRESS: 14
}


export const SCENE_KNOWLEDGE = {
    GOOD_SLEEP: '您昨晚的睡眠很棒！研究表明，优质的睡眠有助于帮助人们从日常和长期压力中恢复，并为整体健康做出积极贡献。',
    BAD_SLEEP: '您昨晚的睡眠不太好，[原因]。睡眠质量差会减弱人的生理活动及其平衡能力, 从而让人难以应对新压力。睡眠不足或睡眠剥夺也可能对机体构成压力威胁, 同时睡眠不好会通过生理变化给人施加压力。',
    GENERAL_SLEEP: 'HRV具有昼夜节律。在正常情况下，应该在放松活动中自然增加，尤其是在副交感神经活动增加的睡眠期间，而在交感神经活动增加的清醒时间减少。',
    SLEEP_SHORTER_DIURNAL_STRESS_HIGHER: "您昨晚的睡眠时长比前一天短，白天压力均值比前一天高。一项研究表明，睡眠时长与工作压力源呈负相关",
    SLEEP_LONGER_DIURNAL_STRESS_LOWER: "您昨晚的睡眠时长比前一天长，白天压力均值比前一天低。一项研究表明，睡眠时长与工作压力源呈负相关", 
    MORE_RELAX_TIME_DURING_SLEEP: "您昨晚睡眠期间的放松时间较前一晚有变长。研究表明，睡眠期间的放松时间越长，第二天觉察到的工作压力源就越少",
    IS_HIGH_INTENSITY_EXERCISE_EFFECT_SLEEP: "您昨天的高强度运动有增加。高强度的运动会导致睡眠期间的恢复能力下降，心率增加，HRV降低，从而压力值升高。这并不是要您停止运动，而是要意识到高强度的运动会给身体带来多大的负担，要更好地保持充足的睡眠和休息，进行简单的恢复、放松活动等。",
    AFTER_EXERCISE: '运动会使交感神经系统的活动增加，导致HRV降低，而压力值是根据HRV进行计算的，运动强度越高，运动后的即时HRV越低，压力值越高。',
    INADEQUATE_EXERCISE_STRESSFUL: '您今天大多数时间都处于压力之中，并且运动量较少。研究表明适当的体育锻炼，特别是有氧运动有助于帮助人们从日常和长期压力中恢复，并为整体健康做出积极贡献。',
    ENOUGH_EXERCISE_STRESSFUL: '您今天大多数时间都处于压力之中，运动量较大，休息时间很少。可以多腾出时间休息，进行冥想、深呼吸等放松训练，有利于减轻压力和焦虑感，使身心得到放松。',
    CALM_OR_BALANCED: '您今天整体的压力不高。大多数人把压力和消极情绪联系在一起，比如恐惧和焦虑，但压力也可以是积极的、有益的。积极压力是人们对一种具有挑战性但不具威胁性的情况的评估，并有信心解决它。积极的压力可以提高我们做事的动力，让我们集中注意力，表现得更好。',
    A_WEEK_EXERCISE_IS_NOT_ENOUGH: "您上周的中高强度运动量较小，世卫组织建议每周进行150分钟的中高等强度活动。运动是对抗压力的一个关键、重要的方法。运动不仅可以促进整体健康，还可以帮助您控制情绪压力和紧张，帮助放松并改善睡眠。",
    DIGESTION: "研究表明，消化食物会引起生理压力，减少副交感神经的活动，使HRV值降低，压力值升高。",
    CHRONIC_STRESS: "注意到您最近长期处于高压力的状态。大量的科学文献表明，适当的体育活动，宁静的睡眠能帮助日常和长期压力的恢复，以及健康的饮食和适量饮酒对健康都有积极的贡献。"
}

export const RANDOM_KNOWLEDGE = [
    "研究发现健康的饮食与较高的​​HRV有关，例如，水果蔬菜、鱼类、五谷杂粮、豆类等。保持健康的饮食能帮助您缓解压力。",
    "研究发现咖啡、可乐、酒精以及不健康的饮食（例如，含有高脂肪或反式脂肪的烧烤、膨化食品等）会刺激交感神经的活动，导致HRV降低，对人造成生理上的压力。",
    "压力值根据HRV计算。HRV（Heart rate variablity，心率变异性）是指逐次心跳周期差异的变化情况。HRV能反映自主神经系统的活动状态。自主神经系统由交感神经系统和副交感神经系统组成。交感神经系统主要活动在压力期间，这时HRV会降低；而副交感神经系统活动在恢复和放松期，这时HRV值会升高。",
    "Garmin手表或手环基于心率变异性（HRV）计算用户的压力分数。心率变异性（HRV）是连续心跳之间的时间间隔变化的生理现象。个体之间的HRV水平差异很大，但总的来说，高HRV被认为是身体健康的标志，而低HRV则与一系列负面健康结果和压力有关。",
    "压力是对潜在危险情况的正常生理或心理反应。当您遇到突然的压力时，您的大脑会产生一些化学物质和激素，例如肾上腺素和皮质醇。这样可以使您的心脏跳动更快，并将血液输送到肌肉和重要器官。积极的压力会让您更专注于当前的任务，而长期处于高压力之中则可能会导致一些心理或身体疾病。"
]

export const NEED_EXPLAIN_ITEM = ['HRV', '自主神经系统', '交感神经', '副交感神经', '副交感神经']

export const NEED_EXPLAIN_ITEM_CONTENT = {
    HRV: 'HRV（Heart rate variablity，心率变异性）是指逐次心跳周期差异的变化情况。HRV能反映自主神经系统的活动状态。自主神经系统由交感神经系统和副交感神经系统组成，大部分的器官受到两者的共同支配，大部分情况下，两者相互拮抗。交感神经系统主要活动在压力期间，这时HRV会降低；而副交感神经系统活动在恢复和放松期，这时HRV值会升高。',
    自主神经: '自主神经系统由交感神经系统和副交感神经系统组成，大部分的器官受到两者的共同支配，大部分情况下，两者相互拮抗，实现身体内环境的稳态。交感神经系统主要活动在压力期间，而副交感神经系统活动在恢复和放松期。',
    交感神经: '交感神经系统和副交感神经系统共同组成自主神经系统，大部分的器官受到两者的共同支配，大部分情况下，两者相互拮抗，实现身体内环境的稳态。当人处于紧急、窘迫、兴奋、运动等状态都会刺激交感神经系统，这时身体会产生战斗或逃跑反应。',
    副交感神经系统: '副交感神经系统和交感神经系统共同组成自主神经系统，大部分的器官受到两者的共同支配，大部分情况下，两者相互拮抗。副交感神经系统主要活动在放松和恢复时期，这时心率减慢，呼吸变浅，汗腺活动减少，瞳孔缩小，血糖降低，皮肤和内脏血流增加。'
}

export const test = () => {
	alert('ok')
}
