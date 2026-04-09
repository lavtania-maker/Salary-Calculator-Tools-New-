import { auth, db } from './firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const loginSection = document.getElementById('loginSection')!;
const adminSection = document.getElementById('adminSection')!;
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const adminEmail = document.getElementById('adminEmail') as HTMLInputElement;
const adminPassword = document.getElementById('adminPassword') as HTMLInputElement;
const logoutBtn = document.getElementById('logoutBtn')!;
const leadsTableBody = document.getElementById('leadsTableBody')!;
const loginError = document.getElementById('loginError')!;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        loginError.textContent = '';
        const email = adminEmail.value.trim();
        const password = adminPassword.value;
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        console.error('Login error:', error);
        loginError.textContent = 'Invalid ID or password. Please try again.';
    }
});

logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
});

onAuthStateChanged(auth, async (user) => {
    if (user && user.email === 'lavtania@epicareer.com') {
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

let currentLeads: any[] = [];

async function loadLeads() {
    try {
        const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        leadsTableBody.innerHTML = '';
        currentLeads = [];
        
        if (querySnapshot.empty) {
            leadsTableBody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No leads found.</td></tr>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            currentLeads.push(data);
            const date = new Date(data.createdAt).toLocaleString();
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHtml(data.email)}</td>
                <td>${escapeHtml(data.userType || '-')}</td>
                <td>${escapeHtml(data.hiringStatus || '-')}</td>
                <td>${escapeHtml(data.action)}</td>
                <td>${date}</td>
            `;
            leadsTableBody.appendChild(tr);
        });
    } catch (error: any) {
        console.error('Error loading leads:', error);
        if (error.message.includes('Missing or insufficient permissions')) {
            leadsTableBody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #dc2626;">Access Denied. You are not authorized to view this data.</td></tr>';
        } else {
            leadsTableBody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #dc2626;">Error loading data.</td></tr>';
        }
    }
}

const exportBtn = document.getElementById('exportBtn');
if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        if (currentLeads.length === 0) {
            alert('No data to export.');
            return;
        }

        const headers = ['Email', 'User Type', 'Hiring Status', 'Action', 'Date'];
        const csvRows = [headers.join(',')];

        currentLeads.forEach(lead => {
            const row = [
                `"${lead.email.replace(/"/g, '""')}"`,
                `"${(lead.userType || '').replace(/"/g, '""')}"`,
                `"${(lead.hiringStatus || '').replace(/"/g, '""')}"`,
                `"${lead.action.replace(/"/g, '""')}"`,
                `"${new Date(lead.createdAt).toLocaleString().replace(/"/g, '""')}"`
            ];
            csvRows.push(row.join(','));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "leads_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

function escapeHtml(unsafe: string) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
