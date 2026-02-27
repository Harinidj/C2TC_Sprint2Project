import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  currentUser: any = { id: null, name: '', email: '', password: '', active: false };
  showModal = false;
  isEditMode = false;
  searchTerm: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.refreshUserList();
  }

  get filteredAdmins() {
    return this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  refreshUserList(): void {
    this.adminService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error("API Error: check if Spring Boot is on 8081", err)
    });
  }

  saveUser(): void {
    const obs = this.isEditMode 
      ? this.adminService.updateUser(this.currentUser.id, this.currentUser)
      : this.adminService.addUser(this.currentUser);

    obs.subscribe({
      next: () => { 
        this.refreshUserList(); 
        this.closeModal(); 
      },
      error: (err) => alert("Action failed. Check console.")
    });
  }

  onDelete(id: number): void {
    if (confirm("Delete this admin?")) {
      this.adminService.deleteUser(id).subscribe({
        next: () => this.refreshUserList(),
        error: (err) => alert("Delete failed.")
      });
    }
  }

  openAddModal() { 
    this.isEditMode = false; 
    this.currentUser = { name: '', email: '', password: '', active: false }; 
    this.showModal = true; 
  }

  openEditModal(u: any) { 
    this.isEditMode = true; 
    this.currentUser = { ...u }; 
    this.showModal = true; 
  }

  closeModal() { this.showModal = false; }
}