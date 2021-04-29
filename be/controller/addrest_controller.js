const toRegister = require('../routes/login');

module.exports = class Member {
    postRegister(req, res, next) {
        // 獲取client端資料
        const memberData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            create_date: onTime()
        }
        console.log(memberData);
        // 將資料寫入資料庫
        // toRegister(memberData).then(result => {
        //     // 若寫入成功則回傳
        //     res.json({
        //         status: "註冊成功。",
        //         result: result 
        //     })
        // }, (err) => {
        //     // 若寫入失敗則回傳
        //     res.json({
        //         result: err
        //     })
        // })
    }
}