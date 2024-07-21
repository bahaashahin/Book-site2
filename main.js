const bookPrices = {
    almoaser: {
        math: {
            1: { price: 100, discount: 0.1 },
            2: { price: 150, discount: 0.15 },
            3: { price: 200, discount: 0.2 }
        },
        physics: {
            1: { price: 120, discount: 0.1 },
            2: { price: 170, discount: 0.15 },
            3: { price: 220, discount: 0.2 }
        },
        chemistry: {
            1: { price: 130, discount: 0.1 },
            2: { price: 180, discount: 0.15 },
            3: { price: 230, discount: 0.2 }
        }
    },
    arts: {
        math: {
            1: { price: 90, discount: 0.1 },
            2: { price: 140, discount: 0.15 },
            3: { price: 190, discount: 0.2 }
        },
        physics: {
            1: { price: 110, discount: 0.1 },
            2: { price: 160, discount: 0.15 },
            3: { price: 210, discount: 0.2 }
        },
        chemistry: {
            1: { price: 120, discount: 0.1 },
            2: { price: 170, discount: 0.15 },
            3: { price: 220, discount: 0.2 }
        }
    },
    technology: {
        math: {
            1: { price: 150, discount: 0.1 },
            2: { price: 200, discount: 0.15 },
            3: { price: 250, discount: 0.2 }
        },
        physics: {
            1: { price: 170, discount: 0.1 },
            2: { price: 220, discount: 0.15 },
            3: { price: 270, discount: 0.2 }
        },
        chemistry: {
            1: { price: 180, discount: 0.1 },
            2: { price: 230, discount: 0.15 },
            3: { price: 280, discount: 0.2 }
        }
    },
    literature: {
        history: {
            1: { price: 80, discount: 0.1 },
            2: { price: 130, discount: 0.15 },
            3: { price: 180, discount: 0.2 },
            4: { price: 230, discount: 0.25 }
        },
        geography: {
            1: { price: 85, discount: 0.1 },
            2: { price: 135, discount: 0.15 },
            3: { price: 185, discount: 0.2 },
            4: { price: 235, discount: 0.25 }
        }
    }
};

const translations = {
    bookType: {
        almoaser: 'المعاصر',
        arts: 'أدبي',
        technology: 'تكنولوجيا',
        literature: 'أدب'
    },
    subject: {
        math: 'رياضيات',
        physics: 'فيزياء',
        chemistry: 'كيمياء',
        history: 'تاريخ',
        geography: 'جغرافيا'
    },
    grade: {
        1: 'الأولى',
        2: 'الثانية',
        3: 'الثالثة',
        4: 'الرابعة'
    }
};

document.getElementById('addBook').addEventListener('click', function() {
    let bookType = document.getElementById('bookType').value;
    let subject = document.getElementById('subject').value;
    let grade = document.getElementById('grade').value;

    let price = bookPrices[bookType][subject][grade].price;
    let discount = bookPrices[bookType][subject][grade].discount;
    let finalPrice = price - (price * discount);

    let rows = document.querySelectorAll('#selectedBooks tbody tr');
    let found = false;

    rows.forEach(row => {
        let rowBookType = row.cells[0].textContent;
        let rowSubject = row.cells[1].textContent;
        let rowGrade = row.cells[2].textContent;

        if (rowBookType === translations.bookType[bookType] &&
            rowSubject === translations.subject[subject] &&
            rowGrade === translations.grade[grade]) {
            let quantityCell = row.cells[5];
            let quantity = parseInt(quantityCell.textContent);
            quantity += 1;
            quantityCell.textContent = quantity;
            found = true;
        }
    });

    if (!found) {
        let bookRow = `
            <tr>
                <td>${translations.bookType[bookType]}</td>
                <td>${translations.subject[subject]}</td>
                <td>${translations.grade[grade]}</td>
                <td>${price} جنيه</td>
                <td>${finalPrice} جنيه</td>
                <td class="quantity-cell">1</td>
            </tr>
        `;

        document.querySelector('#selectedBooks tbody').innerHTML += bookRow;
    }
});

document.getElementById('calculateTotal').addEventListener('click', function() {
    let rows = document.querySelectorAll('#selectedBooks tbody tr');
    let total = 0;

    rows.forEach(row => {
        let finalPriceCell = row.cells[4].textContent;
        let quantityCell = row.cells[5].textContent;
        let finalPrice = parseFloat(finalPriceCell.split(' ')[0]);
        let quantity = parseInt(quantityCell);
        total += finalPrice * quantity;
    });

    document.getElementById('totalPrice').textContent = `${total} جنيه`;
});