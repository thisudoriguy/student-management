
exports.makePayment = (req, res, next)=>{
    console.log('express, please stop disturbing me!')
    if (req.body.cash) {
        res.redirect('/payments/records/transactions')
    } else if(req.body.epayment){
        res.redirect('/payments/online')
    }else{
        return next();
    };
}

function paymentVerifications (req, res, next){
    
    if (req.body.others) {
        var span = document.getElementById('specify');
    } else {
        return next();
    }
}

exports.recordTransactions = (req, res, next)=>{
    res.send('this page is for recording cash transactions')
    console.log('i am here')
}

exports.payOnline = (req, res, next)=>{
    res.send('this page is for recording cash transactions')
    console.log('i am here')
}