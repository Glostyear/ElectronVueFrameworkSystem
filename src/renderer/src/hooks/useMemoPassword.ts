import { ref } from 'vue'
function useMemoPassword(){
    //记住密码按钮
    let memoVal = ref(localStorage.getItem('memoPassword') == 'true'?'true':'false');
    
    const onMemoPassword = (value) =>{
        localStorage.setItem('memoPassword', memoVal.value = value);
    }
    return {
        memoVal,
        onMemoPassword
    }
}

export default useMemoPassword;