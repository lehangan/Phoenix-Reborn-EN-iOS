# Phoenix Reborn — bundled English test

Version 1.55, local build number 15501. Existing bundle ID and development team are preserved.
English game snapshot: 356d29ec1c24de818ddb76b9c5c80dfd7507c9a0.
All game modules, styles and assets are packaged in GameAssets/game. No private preview URL or Vietnamese game URL is loaded.
Progress is stored locally in the app via UserDefaults and restored before the game starts. Existing web saves are not migrated. Deleting the app removes its local progress.

This package is a SOURCE PROJECT, not a signed IPA. Xcode compilation and device execution have NOT been performed in the Linux preparation environment.
Accounts, cloud saves, rankings and online stats are not connected in this offline test. Their controls report unavailability; no progress is sent to the Vietnamese server. Connect a separate iOS backend before testing online features or release.

## Build using existing Xcode Cloud workflow
1. Back up your current checkout. Replace PhuongHoangDemo and PhuongHoangDemo.xcodeproj with these folders in your GitHub checkout.
2. Commit and push to the branch used by your existing Xcode Cloud workflow.
3. Start the existing Archive (iOS) workflow. Use its TestFlight distribution configuration.
4. Confirm archive success and build processing in App Store Connect. Add the processed build to your internal test group if necessary.
5. If build number 15501 was already used, increase it. Xcode Cloud may apply its own build numbering.

## Required device checks
Cold launch in airplane mode; start a new life; advance a month; close and reopen the app to verify the exact save; open wardrobe/CG/music; lock/unlock; confirm online buttons show the offline notice. Do not delete the old app until any required old progress has been backed up.
