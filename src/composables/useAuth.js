import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { initDatabase } from '../db/database'

const authMode = ref('guest') // 'guest' | 'signed-in'
const user = ref(null) // { email, id, provider }
const hasGuestData = ref(false)
const isSigningIn = ref(false)

export function useAuth() {
  const router = useRouter()

  // Check localStorage for auth state on load
  function loadAuthState() {
    const savedMode = localStorage.getItem('authMode')
    const savedUser = localStorage.getItem('authUser')
    
    if (savedMode) {
      authMode.value = savedMode
    }
    
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  // Set guest mode
  function setGuestMode() {
    authMode.value = 'guest'
    user.value = null
    localStorage.setItem('authMode', 'guest')
    localStorage.removeItem('authUser')
    
    // Reinitialize database for guest mode
    initDatabase('guest')
  }

  // Set signed-in mode
  function setSignedInMode(userData) {
    authMode.value = 'signed-in'
    user.value = userData
    localStorage.setItem('authMode', 'signed-in')
    localStorage.setItem('authUser', JSON.stringify(userData))
    
    // Reinitialize database for signed-in mode
    initDatabase('signed-in')
  }

  // Sign in with Google (Dexie Cloud)
  async function signInWithGoogle() {
    isSigningIn.value = true
    
    try {
      // Initialize database for signed-in mode
      const db = initDatabase('signed-in')
      
      // Sign in with Dexie Cloud Google OAuth
      await db.cloud.login({ provider: 'google' })
      
      // Get current user info from Dexie Cloud
      const currentUser = db.cloud.currentUser
      
      if (currentUser) {
        setSignedInMode({
          email: currentUser.email || currentUser.userId,
          id: currentUser.userId,
          provider: 'google'
        })
        
        window.showToast('Signed in successfully!')
        router.push('/')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      window.showToast('Sign in failed: ' + error.message, 'error')
    } finally {
      isSigningIn.value = false
    }
  }

  // Sign out
  async function signOut() {
    try {
      // Sign out from Dexie Cloud if signed in
      if (authMode.value === 'signed-in') {
        const db = initDatabase('signed-in')
        await db.cloud.logout()
      }
      
      // Set guest mode
      setGuestMode()
      
      window.showToast('Signed out successfully')
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
      window.showToast('Sign out failed: ' + error.message, 'error')
    }
  }

  // Check if user has guest data
  async function checkGuestData() {
    // This will be implemented when we add database check
    hasGuestData.value = false
  }

  // Computed properties
  const isGuest = computed(() => authMode.value === 'guest')
  const isSignedIn = computed(() => authMode.value === 'signed-in')
  const userEmail = computed(() => user.value?.email || null)

  // Initialize on load
  loadAuthState()

  return {
    authMode,
    user,
    hasGuestData,
    isSigningIn,
    isGuest,
    isSignedIn,
    userEmail,
    setGuestMode,
    setSignedInMode,
    signInWithGoogle,
    signOut,
    checkGuestData
  }
}
