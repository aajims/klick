export const navMixin = {
    computed: {
        // parentNum() {
        //     let i, item;
        //     const rule = JSON.parse(localStorage.getItem('rules'))
        //     // //console.log('disini rule : ', rule)
        //     for (i = 0; i < rule.length; i++) {
        //         return rule[i]
        //     }
        //     // return JSON.parse(localStorage.getItem('rules'))
        // },
        // parentShort(){
        //     let i, arr = [];
        //
        //     const rule = JSON.parse(localStorage.getItem('rules'))
        //     //console.log('disini rule : ', rule)
        //     for (i = 0; i < rule.length; i++) {
        //         arr.push(rule[i].idmenu)
        //     }
        //     return arr.sort((a, b) => a - b)
        // },
        pureParent() {
            return JSON.parse(localStorage.getItem('rules'))
        }
    },
}