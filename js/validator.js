
// Đối tượng Validator
function Validator(options){

    let formElement = document.querySelector(options.form);
    
    function valid (messageError, messageElement) {
        
        if(messageError){
            messageElement.innerText = messageError;
        }
        else {
            messageElement.innerText = "";
        }
        
    }

    if(formElement){
        
        options.rules.forEach(function (rule) {

            let inputElement = formElement.querySelector(rule.selector);
           

            if(inputElement){
                inputElement.addEventListener('blur', function () {
                    
                    //value: inputElement.value
                    //truyền value vào hàm valid cho nó xử lí
                    //kết quả xử lí sẽ trả về lỗi cho messageError.
                    //messageError sẽ được truyền vào trong valid để hiển thị lỗi

                    let value = inputElement.value;
                    let messageError = rule.test(value);
                    let messageElement = inputElement.parentElement.querySelector(options.messageElement);
                    console.log(messageElement);
                    
                    valid(messageError, messageElement);
                    

                })

                inputElement.addEventListener('focus', function () {
                    let messageElement = inputElement.parentElement.querySelector(options.messageElement);
                    valid('', messageElement);

                })

                inputElement.addEventListener('input', function () {

                    if(inputElement.id == 'password-confirmation'){
                        
                        let value = inputElement.value;
                        let messageError = rule.test(value);
                        let messageElement = inputElement.parentElement.querySelector(options.messageElement);
                        valid(messageError, messageElement);
                    }
                })
            }
        })
    }
}


// Định nghĩa các rules
// Nguyên tắc của các rules:
//      Required: Nhận giá trị value, trả về message lỗi nếu value = '' ngược lại 
//              trả về undefined
//      Email: Dùng regex để kiểm tra và trả về như required
//      minLength: Nhận giá trị của value, tính length so sánh với 'min'
Validator.isRequired = function (selector) {

    return {
        selector: selector,
        test: function (value) {

            return value? undefined: 'Không được bỏ trống trường này!';
            
        }
    }
}

Validator.isEmail = function (selector) {
    
    return {
        selector: selector,
        test: function (value) {

            //Regex cho email có cả unicode

            let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            return regex.test(value)? undefined: "Email không hợp lệ!";
        }
    }

}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {

            return value.length >= min? undefined: `Mật khẩu phải có ít nhất ${min} kí tự!`; 

        }
    }
}

Validator.checkPassword = function (form,selector, password) {
    return {
        selector: selector,
        test: function (value) {
            
            let formElement = document.querySelector(form);
            return value == formElement.querySelector(password).value? undefined : 'Mật khẩu không chính xác!';

        }
    }
}
Validator.checkPhone = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            //Regex cho số điẹn thoại.
            // (123) 456-7890
            // (123)456-7890
            // 123-456-7890
            // 123.456.7890
            // 1234567890
            // +31636363634
            // 075-63546725

            let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return regex.test(value)? undefined: 'Định dạng số điện thoại không đúng!';
        }
    }
}