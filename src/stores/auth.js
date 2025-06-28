import {defineStore} from 'pinia'
import http from '@/utils/http';

export const useAuthStore = defineStore('auth',{
    state:()=>({
        users: [],
        user: JSON.parse(localStorage.getItem('user')) || null,
        error: null,
    }),
    getters:{
        getUserByEmail: (state)=> (email) => {
          return state.users.find(user => user.email === email);
        }
    },
    actions:{
      async fetchUsers(){
        try {
          const res = await http.get('users');
          this.users = res.data.users || [];
          console.log(this.users)
        } catch (e) {
          this.error= e.message || 'Failed to fetch users:';
        }
      }
    }
})
