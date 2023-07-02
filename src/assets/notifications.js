import { reactive } from "vue"

export const notifications = reactive({
    data: []
})

export function setNotification(content, type){
    const newNotify = {
        content,
        type,
        id: crypto.randomUUID()
    }

    notifications.data.push(newNotify)

    setTimeout(() => {
        const index = notifications.data.findIndex(notify => notify === newNotify)

        notifications.data.splice(index, 1)
    }, 4000)
}