const { createClient } = require('@supabase/supabase-js');
const { loadEnvConfig } = require('@next/env');
const fs = require('fs');
const path = require('path');

loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fetchABTests() {
  console.log('🔍 Fetching active A/B tests from Supabase...');
  
  try {
    const { data: rawData, error } = await supabase
      .from('ab_test_definitions')
      .select('*')
      .eq('status', 'active');
    
    let data = rawData;
    if (!data || data.length === 0) {
      console.log('⚠️  No active A/B tests found. Creating empty config.');
      data = [];
    }
    
    if (!data || data.length === 0) {
      console.log('⚠️  No active A/B tests found. Creating empty config.');
      data = [];
    }
    
    // Transform data for client use - map by page_path for quick lookup
    const testsMap = {};
    data.forEach(test => {
      testsMap[test.page_path] = {
        id: test.id,
        test_key: test.test_key,
        name: test.name,
        page_path: test.page_path,
        traffic_allocation: test.traffic_allocation || 1.0,
        variants: test.variants,
        primary_goal: test.primary_goal,
        secondary_goals: test.secondary_goals || [],
      };
    });
    
    // Write to public directory so it's included in static export
    const outputPath = path.join(__dirname, '../public/ab-tests.json');
    const outputDir = path.dirname(outputPath);
    
    // Ensure public directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(testsMap, null, 2));
    
    console.log(`✅ Successfully wrote ${data.length} active test(s) to ${outputPath}`);
    
    // Log test details for verification
    if (data.length > 0) {
      console.log('\n📊 Active Tests:');
      data.forEach(test => {
        console.log(`  • ${test.name} (${test.page_path})`);
        console.log(`    Variants: ${test.variants.length}`);
        console.log(`    Traffic: ${(test.traffic_allocation * 100).toFixed(0)}%`);
      });
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

fetchABTests().catch(err => {
  console.error('❌ Unhandled error:', err);
  process.exit(1);
});
