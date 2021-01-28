/*
 * @Author: your name
 * @Date: 2020-11-22 18:35:52
 * @LastEditTime: 2021-01-28 11:41:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-chatbot-app\src\util\constant.ts
 */
// export const ApiUrl = 'http://stresschatbot.cn:8000'
export const ApiUrl = 'https://stresschatbot.cn/api' 
// export const ApiUrl = 'http://127.0.0.1:5000';   
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
    
}

export const REASONS_FOR_POOR_SLEEP = {
    SLEEP_SHORT: '睡眠时间太短',
    AWAKENINGS_TOO_MUCH: '睡眠期间醒来次数过多',
    FALLBACK_TOO_LONG: '醒来后再次入睡所需时间较长',
    REM_TOO_MUCH: '快速眼动睡眠时间过长',
    DEEP_TOO_LITTLE: '深睡时间太少'
}

export const EXERCISE = {
    AFTER_EXERCISE: '运动后hrv值会降低，并且运动强度越高，运动后的即时hrv越低，压力值越高'
}

export const OVERALL_DAY_STRESS = {
    CALM_OR_BALANCED: '您今天整体的压力不高。大多数人把压力和消极情绪联系在一起，比如恐惧和焦虑，但压力也可以是积极的、有益的。积极压力是人们对一种具有挑战性但不具威胁性的情况的评估，并有信心解决它。积极的压力可以提高我们做事的动力，让我们集中注意力，表现得更好。',
    INADEQUATE_EXERCISE_STRESSFUL: '您今天大多数时间都处于压力之中，并且运动量较少。研究表明适当的体育锻炼，特别是有氧运动有助于帮助人们从日常和长期压力中恢复，并为整体健康做出积极贡献。',
    ENOUGH_EXERCISE_STRESSFUL: '您今天大多数时间都处于压力之中，运动量较大，休息时间很少。可以多腾出时间休息，进行冥想、深呼吸等放松训练，有利于减轻压力和焦虑感，使身心得到放松。'
}

export const SLEEP_QUALIFIER = {
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

export const IS_HIGH_INTENSITY_EXERCISE_EFFECT_SLEEP = "您昨天的高强度运动有增加。高强度的运动会导致睡眠期间的恢复能力下降，心率增加，hrv降低，从而压力值升高。这并不是要您停止运动，而是要意识到高强度的运动会给身体带来多大的负担，要更好地保持充足的睡眠和休息，进行简单的恢复、放松活动等。"

export const WORK_STRESS = "您昨晚的睡眠时长比前一天短，白天压力均值比前一天高。一项研究表明，睡眠时长与工作压力源呈负相关";