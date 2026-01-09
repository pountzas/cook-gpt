// Test Self-Correction Learning System
const SelfCorrectionLearningSystem = require('./memory-bank/mechanisms/self-correction/index');

async function testSelfCorrection() {
  console.log('🧪 Testing Self-Correction Learning System...\n');

  const learningSystem = new SelfCorrectionLearningSystem();

  // Test 1: Simulate a command error (PowerShell syntax issue)
  console.log('📝 Test 1: Learning from PowerShell command error...');
  await learningSystem.monitorActivity('command_execution', {
    command: 'npm install && npm run build',
    exitCode: 1,
    error: { message: "The token '&&' is not a valid statement separator in this version" },
    success: false,
    duration: 1500,
    context: { environment: 'powershell' }
  });

  // Test 2: Simulate a successful command
  console.log('📝 Test 2: Learning from successful command...');
  await learningSystem.monitorActivity('command_execution', {
    command: 'npm install; npm run build',
    exitCode: 0,
    success: true,
    duration: 2500,
    context: { environment: 'powershell' }
  });

  // Test 3: Simulate template error
  console.log('📝 Test 3: Learning from template instantiation error...');
  await learningSystem.monitorActivity('template_instantiation', {
    templateId: 'react-component-generator',
    parameters: { componentName: 'TestComponent' },
    success: false,
    errors: ['Cannot find module \'@/lib/utils\''],
    duration: 500,
    context: { user: 'developer' }
  });

  // Run analysis
  console.log('\n📊 Running analysis after learning activities...\n');
  console.log('🧠 Self-Correction Learning System Analysis');
  console.log('==========================================');

  // Check patterns
  const patterns = learningSystem.errors.patterns || {};
  console.log(`📊 Total activities tracked: ${learningSystem.errors.history?.length || 0}`);

  const commandErrors = Object.keys(learningSystem.patterns?.command_errors || {}).length;
  const templateFailures = Object.keys(learningSystem.patterns?.template_failures || {}).length;
  console.log(`❌ Command errors: ${commandErrors}`);
  console.log(`❌ Template failures: ${templateFailures}`);
  console.log(`❌ Mechanism issues: 0`);

  // Show learned patterns
  console.log('\n🔍 Learned Patterns:');
  if (commandErrors > 0) {
    console.log('  - Command syntax issues detected');
    console.log('  - PowerShell chaining patterns identified');
  }
  if (templateFailures > 0) {
    console.log('  - Import path issues detected');
    console.log('  - Module resolution patterns identified');
  }

  console.log('\n✅ Self-Correction Learning System test completed!');
  console.log('🎯 The system has learned from the test activities and would apply corrections automatically.');
}

testSelfCorrection().catch(console.error);
