<script lang="ts">
    import type { PageData } from './$types';
    import DashboardHeader from '$lib/DashboardHeader.svelte';
    import { goto } from '$app/navigation';

    export let data: PageData;

    // Pagination state for each difficulty
    let easyPage = 1;
    let mediumPage = 1;
    let hardPage = 1;
    const perPage = 5;

    // Group quizzes by difficulty
    const easyQuizzes = data.quizzes.filter(q => q.difficulty === 'EASY');
    const mediumQuizzes = data.quizzes.filter(q => q.difficulty === 'MEDIUM');
    const hardQuizzes = data.quizzes.filter(q => q.difficulty === 'HARD');

    // Paginated slices
    $: easyPaginated = easyQuizzes.slice((easyPage-1)*perPage, easyPage*perPage);
    $: mediumPaginated = mediumQuizzes.slice((mediumPage-1)*perPage, mediumPage*perPage);
    $: hardPaginated = hardQuizzes.slice((hardPage-1)*perPage, hardPage*perPage);

    // Page counts
    $: easyPages = Math.ceil(easyQuizzes.length/perPage);
    $: mediumPages = Math.ceil(mediumQuizzes.length/perPage);
    $: hardPages = Math.ceil(hardQuizzes.length/perPage);

    // Debug log
    console.log('html quizzes:', data.quizzes);

    // Function to start a quiz with category, difficulty, and id
    function startQuiz(category: string, difficulty: string | null, id: number) {
        goto(`/quiz?category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty || '')}&id=${id}`);
    }
</script>

<div class="min-h-screen bg-gray-50">
    <DashboardHeader title="HTML Quizzes" user={undefined} />
    <main class="max-w-7xl mx-auto py-8 px-4">
        <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Available HTML Quizzes</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Easy Section -->
                <section class="mb-0">
                    <h3 class="text-xl font-semibold text-green-700 mb-4 text-center">Easy</h3>
                    <div class="flex flex-col gap-6">
                        {#each easyPaginated as quiz}
                            <div class="bg-gray-100 rounded-lg shadow p-4 flex flex-col justify-between h-full">
                                <div>
                                    <h4 class="text-lg font-bold text-gray-900 mb-2">{quiz.title}</h4>
                                    <div class="mb-2">
                                        <span class="block text-sm text-gray-700 font-semibold">Description:</span>
                                        <p class="text-sm text-gray-500">{quiz.description}</p>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mt-4">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {quiz.difficulty}
                                    </span>
                                    <button class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" on:click={() => startQuiz('HTML', quiz.difficulty, quiz.id)}>
                                        Start Quiz
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                    <div class="flex justify-center mt-4 gap-2">
                        <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" on:click={() => easyPage = Math.max(1, easyPage-1)} disabled={easyPage === 1}>Prev</button>
                        <span class="px-2">Page {easyPage} of {easyPages}</span>
                        <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" on:click={() => easyPage = Math.min(easyPages, easyPage+1)} disabled={easyPage === easyPages}>Next</button>
                    </div>
                </section>

                <!-- Medium Section -->
                <section class="mb-0">
                    <h3 class="text-xl font-semibold text-yellow-700 mb-4 text-center">Medium</h3>
                    <div class="flex flex-col gap-6">
                        {#each mediumPaginated as quiz}
                            <div class="bg-gray-100 rounded-lg shadow p-4 flex flex-col justify-between h-full">
                                <div>
                                    <h4 class="text-lg font-bold text-gray-900 mb-2">{quiz.title}</h4>
                                    <div class="mb-2">
                                        <span class="block text-sm text-gray-700 font-semibold">Description:</span>
                                        <p class="text-sm text-gray-500">{quiz.description}</p>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mt-4">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        {quiz.difficulty}
                                    </span>
                                    <button class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" on:click={() => startQuiz('HTML', quiz.difficulty, quiz.id)}>
                                        Start Quiz
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                    <div class="flex justify-center mt-4 gap-2">
                        <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" on:click={() => mediumPage = Math.max(1, mediumPage-1)} disabled={mediumPage === 1}>Prev</button>
                        <span class="px-2">Page {mediumPage} of {mediumPages}</span>
                        <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" on:click={() => mediumPage = Math.min(mediumPages, mediumPage+1)} disabled={mediumPage === mediumPages}>Next</button>
                    </div>
                </section>

                <!-- Hard Section -->
                <section class="mb-0">
                    <h3 class="text-xl font-semibold text-red-700 mb-4 text-center">Hard</h3>
                    <div class="flex flex-col gap-6">
                        {#each hardPaginated as quiz}
                            <div class="bg-gray-100 rounded-lg shadow p-4 flex flex-col justify-between h-full">
                                <div>
                                    <h4 class="text-lg font-bold text-gray-900 mb-2">{quiz.title}</h4>
                                    <div class="mb-2">
                                        <span class="block text-sm text-gray-700 font-semibold">Description:</span>
                                        <p class="text-sm text-gray-500">{quiz.description}</p>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mt-4">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        {quiz.difficulty}
                                    </span>
                                    <button class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" on:click={() => startQuiz('HTML', quiz.difficulty, quiz.id)}>
                                        Start Quiz
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                    <div class="flex justify-center mt-4 gap-2">
                        <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" on:click={() => hardPage = Math.max(1, hardPage-1)} disabled={hardPage === 1}>Prev</button>
                        <span class="px-2">Page {hardPage} of {hardPages}</span>
                        <button class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" on:click={() => hardPage = Math.min(hardPages, hardPage+1)} disabled={hardPage === hardPages}>Next</button>
                    </div>
                </section>
            </div>
        </div>
    </main>
</div>