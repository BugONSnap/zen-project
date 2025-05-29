<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    // Prop for the header title
    let { title = 'Zentry' }: { title?: string } = $props();

    async function handleLogout() {
        try {
            // Clear the admin cookie
            document.cookie = 'isAdmin=false; path=/; max-age=0';

            // Redirect to main page
            goto('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    // Function to navigate back to the dashboard
    function goBackToDashboard() {
        goto('/dashboard');
    }
</script>

<header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">{title}</h1>
        <div class="flex items-center space-x-4">
            {#if $page.url.pathname !== '/dashboard'}
                <button
                    class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    on:click={goBackToDashboard}
                >
                    Back to Dashboard
                </button>
            {/if}
            <button
                class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                on:click={handleLogout}
            >
                Logout
            </button>
        </div>
    </div>
</header> 