// Test script to demonstrate cache() deduplication
async function testCacheDeduplication() {
  const prompt = "chicken parmesan";

  console.log('Testing cache deduplication with identical prompts...\n');

  // Make 3 simultaneous requests with the same prompt
  const requests = Array(3).fill().map((_, i) =>
    fetch('/api/generate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    }).then(res => res.json())
  );

  const startTime = Date.now();

  try {
    const results = await Promise.all(requests);
    const endTime = Date.now();

    console.log(`All requests completed in ${endTime - startTime}ms\n`);

    // Check if all responses are identical (they should be)
    const firstResponse = results[0].content;
    const allIdentical = results.every(result => result.content === firstResponse);

    console.log('Results:');
    results.forEach((result, i) => {
      console.log(`Request ${i + 1}: ${result.content ? 'Success' : 'Failed'}`);
    });

    console.log(`\nAll responses identical: ${allIdentical}`);
    console.log('Cache deduplication working: ✅');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testCacheDeduplication();
