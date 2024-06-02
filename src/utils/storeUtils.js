// store工具，项localStorage中保存、获取、删除数据，localStorage中保存到数据持久性存在
// 引入store库，用于操作localStorage中的数据
import store from "store";

// 定义一个常量、
const USER_KEY = 'user_key'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // 向localStorage中添加数据
    setUser(user) {
        store.set(USER_KEY, user)
    },
    // 获取localStorage中指定的数据
    getUser() {
        return store.get(USER_KEY) || {}
    },
    // 删除localStorage中指定的数据
    removeUser() {
        store.remove(USER_KEY)
    }
}