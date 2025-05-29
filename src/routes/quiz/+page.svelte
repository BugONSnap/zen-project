<script lang="ts">
    import type { PageData } from './$types';
    import DashboardHeader from '$lib/DashboardHeader.svelte';

    export let data: PageData;

    let currentQuestionIndex = 0;
    let selectedAnswer: number | null = null;
    let score = 0;
    let quizCompleted = false;
    let quizData = data.quiz;
    let userCode = '';
    let userInput = '';
    let timer = 0;
    let timerInterval: any = null;
    let codeFeedback = '';

    // Debug log
    console.log('quizData:', quizData);

    // Helper: is this a single-question quiz (array of strings)?
    $: isSingleQuestion = Array.isArray(quizData.questions) && quizData.questions.length > 0 && typeof quizData.questions[0] === 'string';

    async function saveQuizResult(finalScore: number, isCorrect: boolean) {
        try {
            await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quizId: quizData.id,
                    score: finalScore,
                    isCorrect
                })
            });
        } catch (e) {
            console.error('Failed to save quiz result:', e);
        }
    }

    function handleAnswer(optionIndex: number) {
        selectedAnswer = optionIndex;
    }

    function nextQuestion() {
        if (isSingleQuestion) {
            score = selectedAnswer === parseInt(quizData.answer) ? 1 : 0;
            quizCompleted = true;
            saveQuizResult(score, score > 0);
        } else if (
            quizData.challengeType === 'Complete the Code' || quizData.challengeType === 'Code Challenge'
        ) {
            // Check code answer
            const correct = quizData.questions[currentQuestionIndex].correctAnswer?.trim();
            if (userCode.trim() === correct) {
                score++;
                codeFeedback = 'Correct!';
            } else {
                codeFeedback = 'Incorrect. Try again or continue.';
            }
            quizCompleted = true;
            saveQuizResult(score, score > 0);
        } else {
            if (
                quizData.questions &&
                quizData.questions[currentQuestionIndex] &&
                typeof quizData.questions[currentQuestionIndex].correctAnswer !== 'undefined' &&
                selectedAnswer === quizData.questions[currentQuestionIndex].correctAnswer
            ) {
                score++;
            }
            if (currentQuestionIndex < quizData.questions.length - 1) {
                currentQuestionIndex++;
                selectedAnswer = null;
                userCode = '';
                userInput = '';
            } else {
                quizCompleted = true;
                stopTimer();
                saveQuizResult(score, score === quizData.questions.length);
            }
        }
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        selectedAnswer = null;
        score = 0;
        quizCompleted = false;
        userCode = '';
        userInput = '';
        codeFeedback = '';
        if (quizData.challengeType === 'Time Trial') {
            startTimer();
        }
    }

    function startTimer() {
        timer = quizData.questions?.[currentQuestionIndex]?.timeLimit || 60;
        stopTimer();
        timerInterval = setInterval(() => {
            timer--;
            if (timer <= 0) {
                stopTimer();
                nextQuestion();
            }
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    $: if (quizData.challengeType === 'Time Trial' && !quizCompleted) {
        startTimer();
    }
</script>

<div class="min-h-screen bg-gray-100">
    <DashboardHeader title={quizData.title} />
    <div class="max-w-3xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
            {#if isSingleQuestion}
                {#if !quizCompleted}
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900 mb-2">{quizData.title}</h1>
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-blue-600 h-2.5 rounded-full" style="width: 100%"></div>
                        </div>
                        <p class="text-sm text-gray-600 mt-2">Question 1 of 1</p>
                    </div>
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">
                            {quizData.description}
                        </h2>
                        <div class="space-y-3">
                            {#each quizData.questions as option, index}
                                <button
                                    class="w-full text-left p-4 rounded-lg border transition-colors {selectedAnswer === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}"
                                    on:click={() => handleAnswer(index)}
                                >
                                    {option}
                                </button>
                            {/each}
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button
                            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            on:click={nextQuestion}
                            disabled={selectedAnswer === null}
                        >
                            Finish Quiz
                        </button>
                    </div>
                {:else}
                    <div class="text-center py-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
                        <p class="text-xl text-gray-700 mb-6">
                            Your score: {selectedAnswer === parseInt(quizData.answer) ? 1 : 0} out of 1
                        </p>
                        <button
                            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            on:click={restartQuiz}
                        >
                            Restart Quiz
                        </button>
                    </div>
                {/if}
            {:else if quizData.questions && quizData.questions.length > 0}
                {#if !quizCompleted}
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900 mb-2">{quizData.title}</h1>
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-blue-600 h-2.5 rounded-full" style="width: {((currentQuestionIndex + 1) / quizData.questions.length) * 100}%"></div>
                        </div>
                        <p class="text-sm text-gray-600 mt-2">Question {currentQuestionIndex + 1} of {quizData.questions.length}</p>
                        {#if quizData.challengeType === 'Time Trial'}
                            <p class="text-red-600 font-bold mt-2">Time left: {timer}s</p>
                        {/if}
                    </div>
                    {#if quizData.challengeType === 'Multiple Choice'}
                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-gray-800 mb-4">
                                {quizData.questions[currentQuestionIndex].question}
                            </h2>
                            <div class="space-y-3">
                                {#each quizData.questions[currentQuestionIndex].options as option, index}
                                    <button
                                        class="w-full text-left p-4 rounded-lg border transition-colors {selectedAnswer === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}"
                                        on:click={() => handleAnswer(index)}
                                    >
                                        {option}
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {:else if quizData.challengeType === 'Code Challenge' || quizData.challengeType === 'Complete the Code'}
                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-gray-800 mb-4">
                                {quizData.questions[currentQuestionIndex].question}
                            </h2>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Starter Code:</label>
                            <textarea class="w-full border rounded p-2 font-mono mb-2" rows="6" readonly>{quizData.questions[currentQuestionIndex].starterCode}</textarea>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Your Answer:</label>
                            <textarea class="w-full border rounded p-2 font-mono" rows="6" bind:value={userCode} placeholder="Write or complete the code here..."></textarea>
                            {#if codeFeedback}
                                <div class="mt-2 text-green-600">{codeFeedback}</div>
                            {/if}
                            <div class="flex justify-end mt-4">
                                <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" on:click={nextQuestion}>
                                    Submit Code
                                </button>
                            </div>
                        </div>
                    {:else if quizData.challengeType === 'Identification'}
                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-gray-800 mb-4">
                                {quizData.questions[currentQuestionIndex].question}
                            </h2>
                            <input class="w-full border rounded p-2" type="text" bind:value={userInput} placeholder="Type your answer here..." />
                            <div class="flex justify-end mt-4">
                                <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" on:click={nextQuestion}>
                                    Submit Answer
                                </button>
                            </div>
                        </div>
                    {:else if quizData.challengeType === 'Time Trial'}
                        <div class="mb-6">
                            <h2 class="text-xl font-semibold text-gray-800 mb-4">
                                {quizData.questions[currentQuestionIndex].question}
                            </h2>
                            <div class="space-y-3">
                                {#each quizData.questions[currentQuestionIndex].options as option, index}
                                    <button
                                        class="w-full text-left p-4 rounded-lg border transition-colors {selectedAnswer === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}"
                                        on:click={() => handleAnswer(index)}
                                    >
                                        {option}
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {:else}
                        <div class="text-center py-8 text-gray-500">
                            Unsupported challenge type.
                        </div>
                    {/if}
                    <div class="flex justify-end">
                        <button
                            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            on:click={nextQuestion}
                            disabled={quizData.challengeType === 'Multiple Choice' && selectedAnswer === null}
                        >
                            {currentQuestionIndex === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                        </button>
                    </div>
                {:else}
                    <div class="text-center py-8">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
                        <p class="text-xl text-gray-700 mb-6">
                            Your score: {score} out of {quizData.questions.length}
                        </p>
                        <button
                            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            on:click={restartQuiz}
                        >
                            Restart Quiz
                        </button>
                    </div>
                {/if}
            {:else}
                <div class="text-center py-8 text-gray-500">
                    No questions available for this quiz.
                </div>
            {/if}
        </div>
    </div>
</div>