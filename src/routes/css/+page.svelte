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

    // State for selected answers and feedback
    let selectedAnswers: Record<number, string> = {};
    let feedback: Record<number, string> = {};

    function checkAnswer(quiz) {
        const selected = selectedAnswers[quiz.id];
        if (!selected) {
            feedback[quiz.id] = 'Please select an answer.';
            return;
        }
        if (selected === quiz.answer) {
            feedback[quiz.id] = 'Correct!';
        } else {
            feedback[quiz.id] = `Incorrect. The correct answer is: ${quiz.answer}`;
        }
    }

    function startQuiz(category: string, difficulty: string | null, id: number) {
        goto(`/quiz?category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty || '')}&id=${id}`);
    }
</script>

<div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <DashboardHeader title="CSS Quizzes" />

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Available CSS Quizzes</h2>

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
                                    {#if quiz.options}
                                        {#each (Array.isArray(quiz.options) ? quiz.options : (quiz.options ? JSON.parse(quiz.options) : [])) as option, i}
                                            <div class="mb-2">
                                                <div class="text-sm text-gray-800 font-semibold mb-1">{option.question}</div>
                                                {#if option.options}
                                                    <div class="flex flex-col gap-1">
                                                        {#each option.options as opt, j}
                                                            <label class="inline-flex items-center gap-2">
                                                                <input type="radio" name={`quiz-${quiz.id}`} value={opt} bind:group={selectedAnswers[quiz.id]} />
                                                                <span class="text-xs text-gray-700">{opt}</span>
                                                            </label>
                                                        {/each}
                                                    </div>
                                                {/if}
                                            </div>
                                        {/each}
                                    {/if}
                                </div>
                                <div class="flex items-center gap-2 mt-2">
                                    <button class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" on:click={() => checkAnswer(quiz)}>
                                        Check Answer
                                    </button>
                                    {#if feedback[quiz.id]}
                                        <span class="ml-2 text-sm {feedback[quiz.id].startsWith('Correct') ? 'text-green-700' : 'text-red-700'}">{feedback[quiz.id]}</span>
                                    {/if}
                                </div>
                                <div class="flex justify-between items-center mt-4">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {quiz.difficulty}
                                    </span>
                                    <button class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" on:click={() => startQuiz('CSS', quiz.difficulty, quiz.id)}>
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
                <!-- Medium and Hard sections can be updated similarly if needed -->
            </div>
        </div>
    </main>
</div>