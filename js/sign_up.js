document.querySelector("#pwdCheck").onblur = isEqualPwd; 

      document.memberFrm.onsubmit = function () {
        const userId = document.getElementById("userId");
        const pwd = document.getElementById("pwd");
        const pwdCheck = document.getElementById("pwdCheck");
        const userName = document.getElementById("userName");
        const email = document.getElementById("email");
        const ssn1 = document.getElementById("ssn1");
        const ssn2 = document.getElementById("ssn2");
        const tel1 = document.getElementById("tel1");
        const tel2 = document.getElementById("tel2");
        const tel3 = document.getElementById("tel3");
        
        const regExp3 = /^[가-힣]{2,}$/;
        if (!regExpTest(regExp3, userName, "한글2글자이상 입력하세요."))
          return false;

        const regExp1 = /^[a-z][a-z\d]{3,11}$/;
        const regExp2 = /[0-9]/;
        if(!regExpTest(regExp1
                      ,userId
                      ,"아이디는 영소문자로 시작하는 4~12글자입니다."))
            return false;
        if(!regExpTest(regExp2
                      ,userId
                      ,"아이디는 숫자를 하나이상 포함하세요."))
            return false;

        const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\\*!&]/];

        for (let i = 0; i < regExpArr.length; i++) {
          if (
            !regExpTest(
              regExpArr[i],
              pwd,
              "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다."
            )
          ) {
            return false;
          }
        }

        if (!isEqualPwd()) {
          return false;
        }
        
        
        if (!regExpTest(/^0\d{1,2}$/, tel1, "번호 2자리 이상 입력")) 
          return false;
        if (!regExpTest(/^[0-9]{3,4}$/, tel2, "번호 3자리 이상 입력"))
          return false;
        if (!regExpTest(/^[0-9]{4}$/, tel3, "4자리 번호 입력"))
          return false;

        const regExp4 = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[01])$/;
        const regExp5 = /^[1234]\d{6}$/;
        if (!regExpTest(regExp4, ssn1, "숫자만 입력하세요.")) return false;
        if (!regExpTest(regExp5, ssn2, "숫자만 입력하세요.")) return false;

        if (!ssnCheck(ssn1.value, ssn2.value)) {
          alert("올바른 주민번호가 아닙니다.");
          return false;
        }

        if (
          !regExpTest(
            /^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/,
            email,
            "이메일 형식에 어긋납니다."
          )
        )
          return false;

          (()=>{
            const frm = document.memberFrm;
            const userName = frm.userName;
            const userId = frm.userId.value;
            const pwd = frm.pwd;
            const tel1 = frm.tel1.value;
            const tel2 = frm.tel2.value;
            const tel3 = frm.tel3.value;
            const tel = tel1+tel2+tel3;
            const ssn1 = frm.ssn1.value;
            const ssn2 = frm.ssn2.value;
            const ssn = ssn1+'-'+ssn2;
            const email = frm.email;


            const guestbook = new Guestbook(userName.value, userId, pwd.value, tel, ssn, email.value);
            console.log(guestbook);
            
            const guestbooks = JSON.parse(localStorage.getItem(userId)) || [];
            if(JSON.parse(localStorage.getItem(userId))) {
                alert('있는 회원입니다.');
                return;
            }
            guestbooks.push(guestbook);
            const jsonStr = JSON.stringify(guestbooks);
            localStorage.setItem(userId, jsonStr);

          })();
      };

        class Guestbook {
            constructor (userName, userId, pwd, tel, ssn, email) {
                this.userName = userName;
                this.userId = userId;
                this.pwd = pwd;
                this.tel = tel;
                this.ssn = ssn;
                this.email = email;
            }
        }

      function ssnCheck(ssn1, ssn2) {
        const ssn = ssn1 + ssn2;
        /*
			주민등록번호 체계 및 유효성 검사 (javascript)	
			https://eyecandyzero.tistory.com/240	

			//900909-1234561
			const total = 9*2 + 0*3 + 0*4 + 9*5 + 0*6 + 9*7 + 1*8 + 2*9 + 3*2 + 4*3 + 5*4 + 6*5;//220
            let result = total%11; // 0
			result = 11-0; // 11
			result = result%10;//1

			if(result == 13번째자리수) return true;
			else return false;

        */
        // let total = 0;
        let total = 
            ssn[0] * 2 
          + ssn[1] * 3
          + ssn[2] * 4 
          + ssn[3] * 5 
          + ssn[4] * 6 
          + ssn[5] * 7 
          + ssn[6] * 8 
          + ssn[7] * 9 
          + ssn[8] * 2 
          + ssn[9] * 3 
          + ssn[10] * 4 
          + ssn[11] * 5;
        for (let i = 0; i < 12; i++) {
          if (i < 8) {
            total += parseInt(ssn.substr(i, 1)) * (i + 2);
          } else {
            total += parseInt(ssn.substr(i, 1)) * (i - 6);
          }
        }
        //마지막수와 비교할 수 구하기
        const result = (11 - (total % 11)) % 10;
        //마지막수(13번째 자리)
        const num13 = parseInt(ssn.substr(12, 1));
        //결과
        if (result === num13) return true;
        else return false;
      }

      function isEqualPwd() {
        if (pwd.value === pwdCheck.value) {
          return true;
        } else {
          alert("비밀번호가 일치하지 않습니다.");
          pwd.select();
          return false;
        }
      }

      /**
       * regExp 정규식객체
       * el 검사할 태그객체
       * msg 유효하지 않은 경우 노출할 사용자 피드백
       */
      function regExpTest(regExp, el, msg) {
        if (regExp.test(el.value)) return true;
        //적합한 문자열이 아닌 경우
        alert(msg);
        el.value = "";
        el.focus();
        return false;
      }