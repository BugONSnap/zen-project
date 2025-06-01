<script lang="ts">
    import type { PageData } from './$types';
    import DashboardHeader from '$lib/DashboardHeader.svelte';
    import { goto } from '$app/navigation';

    export let data: PageData;

    // Group quizzes by difficulty
    const easyQuizzes = data.quizzes.filter(q => q.difficulty === 'EASY');
    const mediumQuizzes = data.quizzes.filter(q => q.difficulty === 'MEDIUM');
    const hardQuizzes = data.quizzes.filter(q => q.difficulty === 'HARD');

    // Debug log
    console.log('html quizzes:', data.quizzes);

    // Function to start a quiz with category, difficulty, and id
    function startQuiz(category: string, difficulty: string | null, id: number) {
        goto(`/quiz?category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty || '')}&id=${id}`);
    }
</script>

<div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <DashboardHeader title="HTML Quizzes" />

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Available HTML Quizzes</h2>

            <section class="mb-8">
                <h3 class="text-xl font-semibold text-green-700 mb-2">Easy</h3>
                <ul role="list" class="divide-y divide-gray-200">
                    {#each easyQuizzes as quiz}
                        <li class="py-4">
                            <div class="mb-2">
                                <h3 class="text-lg font-bold text-gray-900">{quiz.title}</h3>
                            </div>
                            {#if quiz.explanation}
                            <div class="mb-2">
                                <span class="block text-sm text-indigo-700 font-semibold">Explanation:</span>
                                <p class="text-sm text-gray-700">{quiz.explanation}</p>
                            </div>
                            {/if}
                            <div class="mb-2">
                                <span class="block text-sm text-gray-700 font-semibold">Description:</span>
                                <p class="text-sm text-gray-500">{quiz.description}</p>
                            </div>
                            {#if quiz.options}
                            <div class="mb-2">
                                <span class="block text-sm text-blue-700 font-semibold">Options:</span>
                                <ul class="list-disc list-inside ml-4">
                                    {#each (Array.isArray(quiz.options) ? quiz.options : (quiz.options ? JSON.parse(quiz.options) : [])) as option, i}
                                        {#if typeof option === 'object' && option !== null}
                                            <li class="text-sm text-gray-800">{option.question ? option.question : ''}</li>
                                            {#if option.options}
                                                <ul class="list-decimal list-inside ml-6">
                                                    {#each option.options as opt, j}
                                                        <li class="text-xs text-gray-600">{opt}</li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        {:else}
                                            <li class="text-sm text-gray-800">{option}</li>
                                        {/if}
                                    {/each}
                                </ul>
                            </div>
                            {/if}
                            <div class="flex justify-between items-center mt-2">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {quiz.difficulty}
                                </span>
                                <button 
                                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    on:click={() => startQuiz('HTML', quiz.difficulty, quiz.id)}
                                >
                                    Start Quiz
                                </button>
                            </div>
                        </li>
                    {/each}
                    {#if easyQuizzes.length === 0}
                        <li class="py-4 text-center text-gray-500">No easy quizzes available yet.</li>
                    {/if}
                </ul>
            </section>

            <section class="mb-8">
                <h3 class="text-xl font-semibold text-yellow-700 mb-2">Medium</h3>
                <ul role="list" class="divide-y divide-gray-200">
                    {#each mediumQuizzes as quiz}
                        <li class="py-4">
                            <div class="mb-2">
                                <h3 class="text-lg font-bold text-gray-900">{quiz.title}</h3>
                            </div>
                            {#if quiz.explanation}
                            <div class="mb-2">
                                <span class="block text-sm text-indigo-700 font-semibold">Explanation:</span>
                                <p class="text-sm text-gray-700">{quiz.explanation}</p>
                            </div>
                            {/if}
                            <div class="mb-2">
                                <span class="block text-sm text-gray-700 font-semibold">Description:</span>
                                <p class="text-sm text-gray-500">{quiz.description}</p>
                            </div>
                            {#if quiz.options}
                            <div class="mb-2">
                                <span class="block text-sm text-blue-700 font-semibold">Options:</span>
                                <ul class="list-disc list-inside ml-4">
                                    {#each (Array.isArray(quiz.options) ? quiz.options : (quiz.options ? JSON.parse(quiz.options) : [])) as option, i}
                                        {#if typeof option === 'object' && option !== null}
                                            <li class="text-sm text-gray-800">{option.question ? option.question : ''}</li>
                                            {#if option.options}
                                                <ul class="list-decimal list-inside ml-6">
                                                    {#each option.options as opt, j}
                                                        <li class="text-xs text-gray-600">{opt}</li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        {:else}
                                            <li class="text-sm text-gray-800">{option}</li>
                                        {/if}
                                    {/each}
                                </ul>
                            </div>
                            {/if}
                            <div class="flex justify-between items-center mt-2">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {quiz.difficulty}
                                </span>
                                <button 
                                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    on:click={() => startQuiz('HTML', quiz.difficulty, quiz.id)}
                                >
                                    Start Quiz
                                </button>
                            </div>
                        </li>
                    {/each}
                    {#if mediumQuizzes.length === 0}
                        <li class="py-4 text-center text-gray-500">No medium quizzes available yet.</li>
                    {/if}
                </ul>
            </section>

            <section>
                <h3 class="text-xl font-semibold text-red-700 mb-2">Hard</h3>
                <ul role="list" class="divide-y divide-gray-200">
                    {#each hardQuizzes as quiz}
                        <li class="py-4">
                            <div class="mb-2">
                                <h3 class="text-lg font-bold text-gray-900">{quiz.title}</h3>
                            </div>
                            {#if quiz.explanation}
                            <div class="mb-2">
                                <span class="block text-sm text-indigo-700 font-semibold">Explanation:</span>
                                <p class="text-sm text-gray-700">{quiz.explanation}</p>
                            </div>
                            {/if}
                            <div class="mb-2">
                                <span class="block text-sm text-gray-700 font-semibold">Description:</span>
                                <p class="text-sm text-gray-500">{quiz.description}</p>
                            </div>
                            {#if quiz.options}
                            <div class="mb-2">
                                <span class="block text-sm text-blue-700 font-semibold">Options:</span>
                                <ul class="list-disc list-inside ml-4">
                                    {#each (Array.isArray(quiz.options) ? quiz.options : (quiz.options ? JSON.parse(quiz.options) : [])) as option, i}
                                        {#if typeof option === 'object' && option !== null}
                                            <li class="text-sm text-gray-800">{option.question ? option.question : ''}</li>
                                            {#if option.options}
                                                <ul class="list-decimal list-inside ml-6">
                                                    {#each option.options as opt, j}
                                                        <li class="text-xs text-gray-600">{opt}</li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        {:else}
                                            <li class="text-sm text-gray-800">{option}</li>
                                        {/if}
                                    {/each}
                                </ul>
                            </div>
                            {/if}
                            <div class="flex justify-between items-center mt-2">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {quiz.difficulty}
                                </span>
                                <button 
                                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    on:click={() => startQuiz('HTML', quiz.difficulty, quiz.id)}
                                >
                                    Start Quiz
                                </button>
                            </div>
                        </li>
                    {/each}
                    {#if hardQuizzes.length === 0}
                        <li class="py-4 text-center text-gray-500">No hard quizzes available yet.</li>
                    {/if}
                </ul>
            </section>
        </div>
    </main>
</div>