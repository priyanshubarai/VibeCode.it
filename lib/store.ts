import { create } from 'zustand'
import { auth, signIn } from './auth'

// const useBear = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))

const useAuth = create((get,set) => ({
    fetchSession: async ()=>{
        const session = await auth();
        return session;
    },
    login: ()=>{
        signIn()
    },
    logout: ()=>{}
}))

export default useAuth;