const ClaudeProvider = require('../providers/claude/ClaudeProvider');

/**
 * Provider Stop Test
 *
 * Koi testing framework nahi — sirf plain Node script.
 * Run: node engine/tests/providerStop.test.js
 *
 * Ye sirf ClaudeProvider ke PUBLIC contract ko test karta hai:
 * detect() -> start() -> stop().
 *
 * Ye test kabhi bhi implementation details verify nahi karega:
 * ❌ provider.runtime.process
 * ❌ child.kill()
 * ❌ removeAllListeners()
 * Sirf contract-level results dekhe jaate hain.
 *
 * Verify:
 *  Q1 - detect().installed === true ?
 *  Q2 - start().started === true ?
 *  Q3 - stop() ek object return karta hai
 *  Q4 - object me stopped, error fields hain
 *  Q5 - stopped === true
 */

(async () => {
        const provider = new ClaudeProvider();

        console.log('Provider Stop Test\n');

        const detection = await provider.detect();
        console.log(`Provider   : ${provider.name}`);
        console.log(`Installed  : ${detection.installed ? 'Yes' : 'No'}`);

        // --- Q1: gate on detect() ---
        if (!detection.installed) {
                console.log('\nSkipping stop test.');
                return;
        }

        const startResult = await provider.start();
        console.log(`Started    : ${startResult.started ? 'Yes' : 'No'}`);

        // --- Q2: gate on start() ---
        if (!startResult.started) {
                console.log(`Error      :\n${startResult.error}`);
                console.log('\nSkipping stop test — provider did not start.');
                return;
        }

        const stopResult = await provider.stop();

        // --- Q3 & Q4: shape verification ---
        const isObject = typeof stopResult === 'object' && stopResult !== null;
        const hasRequiredFields =
                isObject && 'stopped' in stopResult && 'error' in stopResult;

        console.log(`Stopped    : ${stopResult.stopped ? 'Yes' : 'No'}`);
        console.log(`Error      : ${stopResult.error ?? 'None'}`);

        console.log('\n--- Verification ---');
        console.log(`[Q1] detect().installed === true: ✅`);
        console.log(`[Q2] start().started === true: ✅`);
        console.log(`[Q3] stop() returned an object: ${isObject ? '✅' : '❌'}`);
        console.log(
                `[Q4] Object has stopped/error fields: ${hasRequiredFields ? '✅' : '❌'}`
        );
        console.log(
                `[Q5] stopped === true: ${stopResult.stopped === true ? '✅' : '❌'}`
        );
})();