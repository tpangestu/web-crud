let mahasiswaList = [];
let currentMahasiswa = {};

const loadData = () => {
    if (localStorage.getItem('mahasiswaList')) {
        mahasiswaList = JSON.parse(localStorage.getItem('mahasiswaList'));
    }
    displayData();
}

const displayData = () => {
    let tbody = document.querySelector('#mahasiswaTable tbody');
    tbody.innerHTML = '';
    mahasiswaList.forEach((mahasiswa, index) => {
        let tr = document.createElement('tr');
        let idTd = document.createElement('td');
        idTd.textContent = index + 1;
        tr.appendChild(idTd);
        Object.values(mahasiswa).forEach(val => {
            let td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        let actionTd = document.createElement('td');
        let editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="bx bx-edit"></i>';
        editBtn.setAttribute('data-index', index);
        editBtn.onclick = () => {
            editMahasiswa(index);
        }
        editBtn.classList.add('btn_edit');
        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="bx bx-trash"></i>';
        deleteBtn.setAttribute('data-index', index);
        deleteBtn.onclick = () => {
            deleteMahasiswa(index);
        }
        deleteBtn.classList.add('btn_del');
        actionTd.appendChild(editBtn);
        actionTd.appendChild(deleteBtn);
        tr.appendChild(actionTd);
        tbody.appendChild(tr);
    });
}

const addMahasiswa = () => {
    let form = document.createElement('form');
    form.classList.add('form-add');
    let name = document.createElement('input');
    name.classList.add('name_input');
    name.type = 'text';
    name.name = 'name';
    name.placeholder = 'Nama';
    let npm = document.createElement('input');
    npm.classList.add('npm_input');
    npm.type = 'text';
    npm.name = 'npm';
    npm.placeholder = 'NPM';
    let email = document.createElement('input');
    email.classList.add('email_input');
    email.type = 'email';
    email.name = 'email';
    email.placeholder = 'Email';
    let kelas = document.createElement('input');
    kelas.classList.add('kelas_input');   
    kelas.type = 'text';
    kelas.name = 'kelas';
    kelas.placeholder = 'Kelas';
    let jurusan = document.createElement('input');
    jurusan.classList.add('jurusan_input');
    jurusan.type = 'text';
    jurusan.name = 'jurusan';
    jurusan.placeholder = 'Jurusan';
    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.type = 'submit';
    saveBtn.classList.add('btn_save');
    form.appendChild(name);
    form.appendChild(npm);
    form.appendChild(email);
    form.appendChild(kelas);
    form.appendChild(jurusan);
    form.appendChild(saveBtn);
    document.body.appendChild(form);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        currentMahasiswa = {
            name: name.value,
            npm: npm.value,
            email: email.value,
            kelas: kelas.value,
            jurusan: jurusan.value
        }
        mahasiswaList.push(currentMahasiswa);
        localStorage.setItem('mahasiswaList', JSON.stringify(mahasiswaList));
        displayData();
        form.remove();
    });
}

const editMahasiswa = (index) => {
    let form = document.createElement('form');
    form.classList.add('form-add');
    let name = document.createElement('input');
    name.classList.add('name_input');
    name.type = 'text';
    name.name = 'name';
    name.value = mahasiswaList[index].name;
    let npm = document.createElement('input');
    npm.classList.add('npm_input');
    npm.type = 'text';
    npm.name = 'npm';
    npm.value = mahasiswaList[index].npm;
    let email = document.createElement('input');
    email.classList.add('email_input');
    email.type = 'email';
    email.name = 'email';
    email.value = mahasiswaList[index].email;
    let kelas = document.createElement('input');
    kelas.classList.add('kelas_input');
    kelas.type = 'text';
    kelas.name = 'kelas';
    kelas.value = mahasiswaList[index].kelas;
    let jurusan = document.createElement('input');
    jurusan.classList.add('jurusan_input');
    jurusan.type = 'text';
    jurusan.name = 'jurusan';
    jurusan.value = mahasiswaList[index].jurusan;
    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.type = 'submit';
    saveBtn.classList.add('btn_save');
    form.appendChild(name);
    form.appendChild(npm);
    form.appendChild(email);
    form.appendChild(kelas);
    form.appendChild(jurusan);
    form.appendChild(saveBtn);
    document.body.appendChild(form);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        mahasiswaList[index] = {
            name: name.value,
            npm: npm.value,
            email: email.value,
            kelas: kelas.value,
            jurusan: jurusan.value
        }
        localStorage.setItem('mahasiswaList', JSON.stringify(mahasiswaList));
        displayData();
        form.remove();
    });
}

const deleteMahasiswa = (index) => {
    mahasiswaList.splice(index, 1);
    localStorage.setItem('mahasiswaList', JSON.stringify(mahasiswaList));
    displayData();
}

document.querySelector('#addMahasiswa').addEventListener('click', addMahasiswa);
loadData();