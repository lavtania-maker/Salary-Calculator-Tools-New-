import { auth, db } from './firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const loginSection = document.getElementById('loginSection')!;
const adminSection = document.getElementById('adminSection')!;
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const adminUsername = document.getElementById('adminUsername') as HTMLInputElement;
const adminPassword = document.getElementById('adminPassword') as HTMLInputElement;
const logoutBtn = document.getElementById('logoutBtn')!;
const exportBtn = document.getElementById('exportBtn')!;
const leadsTableBody = document.getElementById('leadsTableBody')!;
const totalCountEl = document.getElementById('totalCount')!;
const loginError = document.getElementById('loginError')!;
const selectAllCheckbox = document.getElementById('selectAll') as HTMLInputElement;
const sortDateBtn = document.getElementById('sortDateBtn')!;
const dateFromInput = document.getElementById('dateFrom') as HTMLInputElement;
const dateToInput = document.getElementById('dateTo') as HTMLInputElement;
const clearFilterBtn = document.getElementById('clearFilterBtn')!;
const submitFilterBtn = document.getElementById('submitFilterBtn')!;

let allLeads: any[] = [];
let currentLeads: any[] = [];
let sortDesc = true;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        loginError.textContent = '';
        const username = adminUsername.value.trim();
        const password = adminPassword.value;
        
        if (username === 'ajtsalary' && password === 'LetsDoIt2026!') {
            await signInWithEmailAndPassword(auth, 'ajtsalary@admin.com', password);
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    } catch (error: any) {
        console.error('Login error:', error);
        loginError.textContent = `Authentication failed: ${error.message || error.code || 'Unknown error'}. Please ensure ajtsalary@admin.com is created in Firebase Auth with password LetsDoIt2026! and Email/Password sign-in is enabled.`;
    }
});

logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
});

onAuthStateChanged(auth, async (user) => {
    if (user && user.email === 'ajtsalary@admin.com') {
        loginSection.style.display = 'none';
        adminSection.style.display = 'block';
        loadLeads();
    } else {
        if (user) {
            await signOut(auth);
        }
        loginSection.style.display = 'block';
        adminSection.style.display = 'none';
    }
});

async function loadLeads() {
    try {
        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        allLeads = [];
        currentLeads = [];
        
        if (querySnapshot.empty) {
            leadsTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No leads found.</td></tr>';
            totalCountEl.textContent = '0';
            return;
        }

        querySnapshot.forEach((doc) => {
            allLeads.push(doc.data());
        });
        
        filterLeads();
    } catch (error: any) {
        console.error('Error loading leads:', error);
        if (error.message.includes('Missing or insufficient permissions')) {
            leadsTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #dc2626;">Access Denied. You are not authorized to view this data.</td></tr>';
        } else {
            leadsTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #dc2626;">Error loading data.</td></tr>';
        }
    }
}

function filterLeads() {
    const fromDateStr = dateFromInput.value;
    const toDateStr = dateToInput.value;

    currentLeads = allLeads.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        // Reset time to 00:00:00 for accurate date comparison
        leadDate.setHours(0, 0, 0, 0);

        let isValid = true;

        if (fromDateStr) {
            const fromDate = new Date(fromDateStr);
            fromDate.setHours(0, 0, 0, 0);
            if (leadDate < fromDate) isValid = false;
        }

        if (toDateStr) {
            const toDate = new Date(toDateStr);
            toDate.setHours(0, 0, 0, 0);
            if (leadDate > toDate) isValid = false;
        }

        return isValid;
    });

    // Re-apply sorting
    currentLeads.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDesc ? dateB - dateA : dateA - dateB;
    });

    totalCountEl.textContent = currentLeads.length.toString();
    renderTable();
}

submitFilterBtn.addEventListener('click', filterLeads);

clearFilterBtn.addEventListener('click', () => {
    dateFromInput.value = '';
    dateToInput.value = '';
    filterLeads();
});

function renderTable() {
    leadsTableBody.innerHTML = '';
    
    if (currentLeads.length === 0) {
        leadsTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No leads found.</td></tr>';
        return;
    }

    currentLeads.forEach((data, index) => {
        const date = new Date(data.createdAt).toLocaleString();
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" data-index="${index}"></td>
            <td>${escapeHtml(data.email)}</td>
            <td>${escapeHtml(data.userType || '-')}</td>
            <td>${escapeHtml(data.phoneNumber || '-')}</td>
            <td>${escapeHtml(data.action)}</td>
            <td>${date}</td>
        `;
        leadsTableBody.appendChild(tr);
    });

    if (selectAllCheckbox) selectAllCheckbox.checked = false;
}

sortDateBtn.addEventListener('click', () => {
    sortDesc = !sortDesc;
    currentLeads.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDesc ? dateB - dateA : dateA - dateB;
    });
    renderTable();
});

if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', (e) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        const checkboxes = document.querySelectorAll('.row-checkbox') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach(cb => cb.checked = isChecked);
    });
}

exportBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.row-checkbox') as NodeListOf<HTMLInputElement>;
    const selectedLeads: any[] = [];
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            const index = parseInt(cb.getAttribute('data-index') || '0', 10);
            selectedLeads.push(currentLeads[index]);
        }
    });

    if (selectedLeads.length === 0) {
        alert('Please select at least one email to export.');
        return;
    }

    const headers = ['Email', 'User Type', 'Phone Number', 'Action', 'Date'];
    const csvRows = [headers.join(',')];

    selectedLeads.forEach(lead => {
        const row = [
            `"${lead.email.replace(/"/g, '""')}"`,
            `"${(lead.userType || '').replace(/"/g, '""')}"`,
            `"${(lead.phoneNumber || '').replace(/"/g, '""')}"`,
            `"${lead.action.replace(/"/g, '""')}"`,
            `"${new Date(lead.createdAt).toLocaleString().replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "selected_leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

function escapeHtml(unsafe: string) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
