<script lang="ts">
  import DashboardHeader from '$lib/DashboardHeader.svelte';
  export let data: {
    user: { id: number; username: string; email: string; totalPoints: number; createdAt: string };
    categories: { id: number; name: string; completed: number; total: number; progress: number }[];
  };
  let user = data.user;
  let categories = data.categories;
</script>

<DashboardHeader user={user} />

<div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
    <div class="flex flex-col items-center mb-6">
      <div class="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-3xl font-bold text-white mb-2">
        {user.username.charAt(0).toUpperCase()}
      </div>
      <h2 class="text-2xl font-bold mb-1">{user.username}</h2>
      <p class="text-gray-500">{user.email}</p>
    </div>
    <p class="text-gray-700 mb-6">Welcome to your profile page!</p>
    <div class="text-left">
      <h3 class="text-lg font-semibold mb-2">Category Progress</h3>
      {#if categories.length === 0}
        <p class="text-gray-500">No categories found.</p>
      {:else}
        <ul class="space-y-4">
          {#each categories as category}
            <li>
              <div class="flex justify-between items-center mb-1">
                <span class="font-medium">{category.name}</span>
                <span class="text-sm text-gray-500">{category.completed} / {category.total} quizzes</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-indigo-500 h-2 rounded-full" style="width: {category.progress}%"></div>
              </div>
              <div class="text-right text-xs text-gray-500 mt-1">{category.progress}%</div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>
