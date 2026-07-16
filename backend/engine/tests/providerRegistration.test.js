const ProviderManager = require('../core/ProviderManager');
const ClaudeProvider = require('../providers/claude/ClaudeProvider');

/**
 * Provider Registration Test
 *
 * Koi testing framework nahi — sirf plain Node script.
 * Run: node engine/tests/providerRegistration.test.js
 *
 * Isse prove hota hai:
 *  Q1 - ProviderManager ek provider register kar sakta hai
 *  Q2 - Duplicate register hone par error aata hai (optional/basic check)
 *  Q3 - list() me provider mil raha hai
 *  Q4 - get("claude") sahi object return karta hai
 */

const manager = new ProviderManager();
const claudeProvider = new ClaudeProvider();

// --- Q1: Register ---
manager.register(claudeProvider);
console.log('[Q1] Registered "claude" without error. ✅');

// --- Q2: Duplicate registration should throw ---
try {
        manager.register(claudeProvider);
        console.log('[Q2] Duplicate register did NOT throw. ❌');
} catch (err) {
        console.log('[Q2] Duplicate register correctly threw an error. ✅');
}

// --- Q3 & Q4: list() and get() ---
const providers = manager.list();
const claudeFromGet = manager.get('claude');

console.log('\nRegistered Providers\n');
providers.forEach((provider, index) => {
        console.log(`${index + 1}. ${provider.name} (${provider.id})`);
});

console.log('\n--- Verification ---');
console.log(
        `[Q3] list() contains 1 provider: ${providers.length === 1 ? '✅' : '❌'}`
);
console.log(
        `[Q4] get("claude") returns correct object: ${claudeFromGet === claudeProvider ? '✅' : '❌'
        }`
);


/**
 * Provider Detection Test
 *
 * Koi testing framework nahi — sirf plain Node script.
 * Run: node engine/tests/providerDetection.test.js
 *
 * Ye sirf ClaudeProvider.detect() ko test karta hai.
 * ProviderContract / ProviderManager already prove ho chuke hain.
 *
 * Verify:
 *  Q1 - detect() ek object return karta hai
 *  Q2 - object me installed, executablePath, error fields hain
 *  Q3 - installed hone par path print ho, warna error print ho
 */

(async () => {
        const provider = new ClaudeProvider();
        const result = await provider.detect();

        // --- Q1 & Q2: shape verification ---
        const isObject = typeof result === 'object' && result !== null;
        const hasRequiredFields =
                isObject &&
                'installed' in result &&
                'executablePath' in result &&
                'error' in result;

        console.log('Provider Detection Test\n');
        console.log(`Provider   : ${provider.name}`);
        console.log(`Installed  : ${result.installed ? 'Yes' : 'No'}`);

        // --- Q3: conditional output ---
        if (result.installed) {
                console.log(`Executable :\n${result.executablePath}`);
        } else {
                console.log(`Error      :\n${result.error}`);
        }

        console.log('\n--- Verification ---');
        console.log(`[Q1] detect() returned an object: ${isObject ? '✅' : '❌'}`);
        console.log(
                `[Q2] Object has installed/executablePath/error fields: ${hasRequiredFields ? '✅' : '❌'
                }`
        );
})();