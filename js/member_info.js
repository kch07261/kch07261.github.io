const loadGuestbook = () => {
    const tbody = document.querySelector("table#tbl-guestbook tbody");
    const keys = Object.keys(localStorage);
    const guestbooks = JSON.parse(localStorage.getItem(`${keys}`));
    
    console.log(guestbooks);
    guestbooks.forEach((elem, index) => {
        const {userName, userId, pwd, tel, ssn, email} = guestbooks;
        const tr = `
        <tr>
            <td>${index + 1}</td>
            <td>${guestbooks[index].userName}</td>
            <td>${guestbooks[index].userId}</td>
            <td>${guestbooks[index].pwd}</td>
            <td>${guestbooks[index].tel}</td>
            <td>${guestbooks[index].email}</td>
        </tr>
        `;
        // console.log(guestbooks[index].userName);
        // console.log(guestbooks[index].userId);
        // console.log(guestbooks[index].pwd);
        // console.log(guestbooks[index].tel);
        // console.log(guestbooks[index].email);
        tbody.innerHTML += tr;
    });
};
loadGuestbook();