<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';

    let activeTab: 'login' | 'register' = 'login';
    let email = '';
    let password = '';
    let username = '';
    let error = '';
    let loading = false;
    let formElement: HTMLFormElement;

    // Validation states
    let emailError = '';
    let passwordError = '';
    let usernameError = '';
    let passwordStrength = 0;

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordPattern = {
        minLength: 8,
        hasUpperCase: /[A-Z]/,
        hasLowerCase: /[a-z]/,
        hasNumber: /[0-9]/,
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
    };

    // Clean up function
    function cleanup() {
        email = '';
        password = '';
        username = '';
        error = '';
        loading = false;
        emailError = '';
        passwordError = '';
        usernameError = '';
        passwordStrength = 0;
        if (formElement) {
            formElement.reset();
        }
    }

    onMount(() => {
        return () => {
            cleanup();
        };
    });

    onDestroy(() => {
        cleanup();
    });

    // Validation functions
    function validateEmail(value: string): boolean {
        if (!value) {
            emailError = 'Email is required';
            return false;
        }
        if (!emailPattern.test(value)) {
            emailError = 'Please enter a valid email address';
            return false;
        }
        emailError = '';
        return true;
    }

    function validatePassword(value: string): boolean {
        if (!value) {
            passwordError = 'Password is required';
            return false;
        }

        if (value.length < passwordPattern.minLength) {
            passwordError = `Password must be at least ${passwordPattern.minLength} characters`;
            return false;
        }

        // Calculate password strength
        passwordStrength = 0;
        if (passwordPattern.hasUpperCase.test(value)) passwordStrength++;
        if (passwordPattern.hasLowerCase.test(value)) passwordStrength++;
        if (passwordPattern.hasNumber.test(value)) passwordStrength++;
        if (passwordPattern.hasSpecialChar.test(value)) passwordStrength++;

        if (passwordStrength < 3) {
            passwordError = 'Password must include uppercase, lowercase, number, and special character';
            return false;
        }

        passwordError = '';
        return true;
    }

    function validateUsername(value: string): boolean {
        if (!value) {
            usernameError = 'Username is required';
            return false;
        }
        if (!usernamePattern.test(value)) {
            usernameError = 'Username must be 3-20 characters and can only contain letters, numbers, and underscores';
            return false;
        }
        usernameError = '';
        return true;
    }

    // Input handlers with validation
    function handleEmailInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        email = value;
        validateEmail(value);
    }

    function handlePasswordInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        password = value;
        validatePassword(value);
    }

    function handleUsernameInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        username = value;
        validateUsername(value);
    }

    async function handleSubmit() {
        // Validate all fields
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isUsernameValid = activeTab === 'register' ? validateUsername(username) : true;

        if (!isEmailValid || !isPasswordValid || !isUsernameValid) {
            return;
        }

        loading = true;
        error = '';

        try {
            const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
            const body = activeTab === 'login' ? { email, password } : { email, password, username };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            // Check for admin credentials and set cookie
            if (activeTab === 'login' && email.toLowerCase() === 'admin@gmail.com') {
                // Set admin cookie
                document.cookie = 'isAdmin=true; path=/; max-age=86400'; // 24 hours
                goto('/admin');
            } else {
                // For non-admin users, ensure admin cookie is not set (or remove it if it exists)
                document.cookie = 'isAdmin=false; path=/; max-age=0'; // Expire the cookie immediately
                goto('/dashboard');
            }
        } catch (e: any) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    function switchTab(tab: 'login' | 'register') {
        activeTab = tab;
        cleanup();
    }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <!-- Tabs -->
        <div class="flex border-b border-gray-200">
            <button
                class="flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm {activeTab === 'login' 
                    ? 'border-indigo-500 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                on:click={() => switchTab('login')}
            >
                Login
            </button>
            <button
                class="flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm {activeTab === 'register' 
                    ? 'border-indigo-500 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                on:click={() => switchTab('register')}
            >
                Register
            </button>
        </div>

        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {activeTab === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </h2>
        </div>

        {#if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">{error}</span>
            </div>
        {/if}

        <form 
            class="mt-8 space-y-6" 
            on:submit|preventDefault={handleSubmit}
            bind:this={formElement}
        >
            <div class="rounded-md shadow-sm -space-y-px">
                {#if activeTab === 'register'}
                    <div>
                        <label for="username" class="sr-only">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            on:input={handleUsernameInput}
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border {usernameError ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username"
                        />
                        {#if usernameError}
                            <p class="mt-1 text-sm text-red-600">{usernameError}</p>
                        {/if}
                    </div>
                {/if}
                <div>
                    <label for="email" class="sr-only">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        on:input={handleEmailInput}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border {emailError ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 {activeTab === 'login' ? 'rounded-t-md' : ''} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                    {#if emailError}
                        <p class="mt-1 text-sm text-red-600">{emailError}</p>
                    {/if}
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        on:input={handlePasswordInput}
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border {passwordError ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                    {#if passwordError}
                        <p class="mt-1 text-sm text-red-600">{passwordError}</p>
                    {/if}
                    {#if activeTab === 'register' && password}
                        <div class="mt-2">
                            <div class="flex space-x-2">
                                {#each Array(4) as _, i}
                                    <div class="flex-1 h-2 rounded-full {i < passwordStrength ? 'bg-green-500' : 'bg-gray-200'}"></div>
                                {/each}
                            </div>
                            <p class="mt-1 text-xs text-gray-500">
                                Password strength: {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || 'None'}
                            </p>
                        </div>
                    {/if}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {#if loading}
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                    {/if}
                    {activeTab === 'login' ? 'Sign in' : 'Register'}
                </button>
            </div>

            {#if activeTab === 'login'}
                <div class="text-center">
                    <button
                        type="button"
                        class="text-sm text-indigo-600 hover:text-indigo-500"
                        on:click={() => {
                            // TODO: Implement forgot password functionality
                            alert('Forgot password functionality coming soon!');
                        }}
                    >
                        Forgot your password?
                    </button>
                </div>
            {/if}
        </form>
    </div>
</div>
