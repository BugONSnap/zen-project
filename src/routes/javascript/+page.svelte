<script lang="ts">
    import type { PageData } from './$types';
    import DashboardHeader from '$lib/DashboardHeader.svelte';
    import { goto } from '$app/navigation';

    let { data }: { data: PageData } = $props();

    // Placeholder for JavaScript quiz data
    const jsQuizzes = [
        { id: 1, title: 'JavaScript Variables and Data Types', description: 'Learn the basics of variables and data types in JS.', difficulty: 'Easy' },
        { id: 2, title: 'JavaScript Functions and Scope', description: 'Understand how functions and scope work.', difficulty: 'Medium' },
        { id: 3, title: 'JavaScript Arrays and Objects', description: 'Work with collections of data in JS.', difficulty: 'Medium' },
    ];

    // Function to start a quiz
    function startQuiz(quizId: number) {
        goto(`/quiz?id=${quizId}`);
    }
</script>

<div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <DashboardHeader title="JavaScript Quizzes" />

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Available JavaScript Quizzes</h2>

            <ul role="list" class="divide-y divide-gray-200">
                {#each jsQuizzes as quiz}
                    <li class="py-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="text-lg font-medium text-gray-900">{quiz.title}</h3>
                                <p class="text-sm text-gray-500">{quiz.description}</p>
                            </div>
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {quiz.difficulty}
                            </span>
                        </div>
                        <!-- Add a button or link to start the quiz -->
                         <div class="mt-2">
                             <button 
                                 class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                 on:click={() => startQuiz(quiz.id)}
                             >
                                 Start Quiz
                             </button>
                         </div>
                    </li>
                {/each}
                 {#if jsQuizzes.length === 0}
                     <li class="py-4 text-center text-gray-500">
                         No JavaScript quizzes available yet.
                     </li>
                 {/if}
            </ul>
        </div>
    </main>
</div>