import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { initDatabase } from '../db/database'

const authMode = ref('guest') // 'guest' | 'signed-in'
const user = ref(null) // { email, id, provider }
const hasGuestData = ref(false)
const isSigningIn = ref(false)

export function useAuth() {
  const router = useRouter()

  // Check Dexie Cloud session and localStorage for auth state on load
  async function loadAuthState() {
    const savedMode = localStorage.getItem('authMode')
    const savedUser = localStorage.getItem('authUser')
    
    // If localStorage says signed-in, verify with Dexie Cloud
    if (savedMode === 'signed-in') {
      try {
        const db = initDatabase('signed-in')
        
        // Wait a moment for Dexie Cloud addon to initialize
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const currentUser = db.cloud?.currentUser
        
        if (currentUser) {
          // Dexie Cloud session is valid - restore from localStorage
          authMode.value = 'signed-in'
          if (savedUser) {
            user.value = JSON.parse(savedUser)
          } else {
            // Fallback: set user from Dexie Cloud
            user.value = {
              email: currentUser.email || currentUser.userId,
              id: currentUser.userId,
              provider: 'google'
            }
            localStorage.setItem('authUser', JSON.stringify(user.value))
          }
        } else {
          // Dexie Cloud session is invalid - fall back to guest
          console.log('Dexie Cloud session invalid, falling back to guest mode')
          setGuestMode()
        }
      } catch (error) {
        console.error('Error checking Dexie Cloud session:', error)
        // On error, fall back to guest mode
        setGuestMode()
      }
    } else {
      // Guest mode
      authMode.value = 'guest'
      user.value = null
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
      
      // Wait a moment for Dexie Cloud addon to initialize
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Check if cloud is available
      if (!db.cloud) {
        throw new Error('Dexie Cloud not initialized. Check configuration.')
      }
      
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
      // On sign-in failure, fall back to guest mode
      setGuestMode()
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
        
        // Wait a moment for Dexie Cloud addon to initialize
        await new Promise(resolve => setTimeout(resolve, 100))
        
        if (db.cloud) {
          await db.cloud.logout()
        }
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

  // Initialize on load (async)
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
