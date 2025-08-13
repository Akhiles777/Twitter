// lib/global-tweets.ts

export interface Tweet {
    id: string
    name: string
    post: string
    image?: string
    time?: any
}

// Глобальный массив
export const TWEETS: Tweet[] = []

// Функция для загрузки
export function setTweets(newTweets: Tweet[]) {
    TWEETS.length = 0          // очищаем
    TWEETS.push(...newTweets) // вставляем новые посты
}


console.log(TWEETS)