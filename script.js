// ==== DOM Elements ====
const studentForm = document.getElementById('studentForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const tableBody = document.getElementById('tableBody');

const inputNama = document.getElementById('nama');
const inputNim = document.getElementById('nim');
const inputAlamat = document.getElementById('alamat');
const inputJk = document.getElementById('jk');
const inputPassword = document.getElementById('password');
const inputEditIndex = document.getElementById('editIndex');

const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const exportExcelBtn = document.getElementById('exportExcelBtn');

const paginationContainer = document.getElementById('pagination');
const pageInfo = document.getElementById('pageInfo');

const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const htmlEl = document.documentElement;
const togglePasswordBtn = document.getElementById('togglePassword');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ==== State Variables ====
let students = [];
let currentPage = 1;
const limitPerPage = 5;

// ==== Initialization ====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadData();
    renderTable();
});

// ==== LocalStorage Data Handling ====
function loadData() {
    const data = localStorage.getItem('studentData');
    if (data) {
        students = JSON.parse(data);
    } else {
        // Mulai dengan data kosong jika belum ada data di LocalStorage
        students = [];
    }
}

function saveData() {
    localStorage.setItem('studentData', JSON.stringify(students));
}

// ==== Table Rendering, Search, Sort & Pagination ====
function renderTable() {
    // 1. Filter Search
    const searchTerm = searchInput.value.toLowerCase();
    let filteredStudents = students.filter(std => 
        std.nama.toLowerCase().includes(searchTerm) || 
        std.nim.includes(searchTerm)
    );

    // 2. Sort
    const sortVal = sortSelect.value;
    if (sortVal === 'nama_asc') {
        filteredStudents.sort((a, b) => a.nama.localeCompare(b.nama));
    } else if (sortVal === 'nama_desc') {
        filteredStudents.sort((a, b) => b.nama.localeCompare(a.nama));
    } else if (sortVal === 'nim_asc') {
        filteredStudents.sort((a, b) => parseInt(a.nim) - parseInt(b.nim));
    } else {
        // 'terbaru' (default array order / based on id insertion)
        // Reverse array to show newest first, assuming append at the end
        filteredStudents = [...filteredStudents].reverse();
    }

    // 3. Pagination Logic
    const totalItems = filteredStudents.length;
    const totalPages = Math.ceil(totalItems / limitPerPage) || 1;
    
    // Ensure currentPage doesn't exceed totalPages
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    // 4. Render Table Body
    tableBody.innerHTML = '';
    
    if (paginatedStudents.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="empty-state">Tidak ada data ditemukan</td></tr>`;
    } else {
        paginatedStudents.forEach((std, index) => {
            // Actual numbering across pages
            const number = startIndex + index + 1;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${number}</td>
                <td>${std.nim}</td>
                <td>${std.nama}</td>
                <td>${std.jk}</td>
                <td>
                    <div class="action-buttons">
                        <button onclick="editStudent(${std.id})" class="action-btn btn-edit" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        </button>
                        <button onclick="deleteStudent(${std.id})" class="action-btn btn-delete" title="Hapus">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // 5. Render Pagination Info
    let startInfo = totalItems === 0 ? 0 : startIndex + 1;
    let endInfo = endIndex > totalItems ? totalItems : endIndex;
    pageInfo.textContent = `Menampilkan ${startInfo}-${endInfo} dari ${totalItems} data`;

    // 6. Render Pagination Buttons
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    paginationContainer.innerHTML = '';
    
    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    };
    paginationContainer.appendChild(prevBtn);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.onclick = () => {
            currentPage = i;
            renderTable();
        };
        paginationContainer.appendChild(btn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    };
    paginationContainer.appendChild(nextBtn);
}

// ==== Event Listeners for Filters ====
searchInput.addEventListener('input', () => {
    currentPage = 1; // Reset to page 1 on search
    renderTable();
});
sortSelect.addEventListener('change', renderTable);

// ==== CRUD Operations ====

// 1. Create & Update
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newStudent = {
        id: inputEditIndex.value ? parseInt(inputEditIndex.value) : Date.now(),
        nama: inputNama.value.trim(),
        nim: inputNim.value.trim(),
        alamat: inputAlamat.value.trim(),
        jk: inputJk.value,
        password: inputPassword.value
    };

    if (inputEditIndex.value) {
        // Update
        const index = students.findIndex(s => s.id === newStudent.id);
        if (index !== -1) {
            students[index] = newStudent;
            showToast('Data berhasil diperbarui!');
        }
    } else {
        // Create
        // Check if NIM exists
        if(students.some(s => s.nim === newStudent.nim)) {
            alert('NIM sudah terdaftar!');
            return;
        }
        students.push(newStudent);
        showToast('Data berhasil ditambahkan!');
    }

    saveData();
    resetForm();
    renderTable();
});

// 2. Delete
window.deleteStudent = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        students = students.filter(s => s.id !== id);
        saveData();
        renderTable();
        showToast('Data berhasil dihapus!');
    }
};

// 3. Edit (Populate form)
window.editStudent = (id) => {
    const student = students.find(s => s.id === id);
    if (student) {
        formTitle.textContent = 'Edit Data Mahasiswa';
        inputEditIndex.value = student.id;
        inputNama.value = student.nama;
        inputNim.value = student.nim;
        inputAlamat.value = student.alamat;
        inputJk.value = student.jk;
        inputPassword.value = student.password;
        
        submitBtn.textContent = 'Update Data';
        cancelBtn.classList.remove('hidden');
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Form Reset
function resetForm() {
    studentForm.reset();
    inputEditIndex.value = '';
    formTitle.textContent = 'Tambah Data Mahasiswa';
    submitBtn.textContent = 'Simpan Data';
    cancelBtn.classList.add('hidden');
}

cancelBtn.addEventListener('click', resetForm);

// ==== Additional Features ====

// 1. Password Toggle Visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    inputPassword.setAttribute('type', type);
    
    // Change Icon
    if (type === 'text') {
        togglePasswordBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`;
    } else {
        togglePasswordBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="eye-icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
    }
});

// 2. Export Excel (CSV Download Tanpa Peringatan)
exportExcelBtn.addEventListener('click', () => {
    if(students.length === 0) {
        alert('Tidak ada data untuk diexport!');
        return;
    }
    
    // Menambahkan BOM (Byte Order Mark) agar Excel membaca UTF-8 dengan benar
    const BOM = "\uFEFF";
    // Menggunakan titik koma (;) sebagai delimiter karena ini adalah standar Excel regional Indonesia
    let csvContent = BOM + "No;NIM;Nama Lengkap;Jenis Kelamin;Alamat\n";
    
    students.forEach((std, index) => {
        // Membersihkan data dari karakter yang bisa merusak format CSV
        const safeNama = `"${std.nama.replace(/"/g, '""')}"`;
        const safeAlamat = `"${std.alamat.replace(/"/g, '""')}"`;
        
        // Memaksa NIM menjadi teks di Excel dengan format ="NIM" agar nol di depan tidak hilang
        const safeNim = `="${std.nim}"`;
        
        const row = `${index + 1};${safeNim};${safeNama};${std.jk};${safeAlamat}`;
        csvContent += row + "\n";
    });

    // Create a Blob dengan format CSV murni
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    // Menggunakan ekstensi .csv agar tidak memicu peringatan keamanan 'Extension Hardening' dari Excel
    link.setAttribute("download", "data_mahasiswa.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// 3. Dark/Light Mode
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if(theme === 'dark') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// 4. Toast Notification System
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
