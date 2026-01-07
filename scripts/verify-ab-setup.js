/**
 * Verification script for A/B testing setup
 * Run this to check if everything is configured correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying A/B Testing Setup...\n');

let hasErrors = false;

// Check 1: Environment variables
console.log('1️⃣ Checking environment variables...');
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY'
];

requiredEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`   ✅ ${varName} is set`);
  } else {
    console.log(`   ❌ ${varName} is missing`);
    hasErrors = true;
  }
});

// Check 2: Required files
console.log('\n2️⃣ Checking required files...');
const requiredFiles = [
  'scripts/fetch-ab-tests.js',
  'lib/ab-testing-ssg.ts',
  'hooks/useABTestSSG.ts',
  'app/api/ab-track/route.ts',
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} is missing`);
    hasErrors = true;
  }
});

// Check 3: Public directory
console.log('\n3️⃣ Checking public directory...');
const publicDir = path.join(__dirname, '..', 'public');
if (fs.existsSync(publicDir)) {
  console.log('   ✅ public/ directory exists');
  
  const abTestsFile = path.join(publicDir, 'ab-tests.json');
  if (fs.existsSync(abTestsFile)) {
    console.log('   ✅ ab-tests.json exists');
    try {
      const content = JSON.parse(fs.readFileSync(abTestsFile, 'utf8'));
      const testCount = Object.keys(content).length;
      console.log(`   ℹ️  Found ${testCount} active test(s)`);
    } catch (e) {
      console.log('   ⚠️  ab-tests.json exists but may be invalid JSON');
    }
  } else {
    console.log('   ⚠️  ab-tests.json not found (will be created on build)');
  }
} else {
  console.log('   ❌ public/ directory missing');
  hasErrors = true;
}

// Check 4: Package.json scripts
console.log('\n4️⃣ Checking package.json scripts...');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.scripts?.prebuild) {
    console.log('   ✅ prebuild script configured');
  } else {
    console.log('   ❌ prebuild script missing');
    hasErrors = true;
  }
  
  if (packageJson.scripts?.build) {
    console.log('   ✅ build script exists');
  } else {
    console.log('   ❌ build script missing');
    hasErrors = true;
  }
} else {
  console.log('   ❌ package.json not found');
  hasErrors = true;
}

// Check 5: Next.js config
console.log('\n5️⃣ Checking Next.js configuration...');
const nextConfigPath = path.join(__dirname, '..', 'next.config.ts');
if (fs.existsSync(nextConfigPath)) {
  const configContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  if (configContent.includes('output: "export"')) {
    console.log('   ✅ Static export configured');
  } else {
    console.log('   ⚠️  Static export not configured (may not work on Cloudflare Pages)');
  }
} else {
  console.log('   ⚠️  next.config.ts not found');
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Setup has errors. Please fix the issues above.');
  process.exit(1);
} else {
  console.log('✅ A/B Testing setup looks good!');
  console.log('\n📝 Next steps:');
  console.log('   1. Create a test in the admin panel');
  console.log('   2. Run: npm run build');
  console.log('   3. Deploy to Cloudflare Pages');
  console.log('   4. Monitor results in admin panel');
}
console.log('='.repeat(50) + '\n');
