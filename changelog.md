# 📝 Changelog

## v1.3.0
- Added `/nohello` slash command and "No Hello" context menu command.

## v1.2.2
- Renamed "Reject via NaaS" context menu command to "No"
- Misc code cleanup

## v1.2.1
- Bot will now ignore replies to its own messages
- Bot will now ignore any `@role` type mentions
- Misc
  - Additional code safeguarding for clean(er) failures
  - Clearer error messaging

## v1.2.0
- Added auto-replies from bot when someone @mentions it
  - Replies are randomly selected from `mention-replies.json`

## v1.1.2
- Embed reply now shows the displayname of the interactive user, instead of username.

## v1.1.1
- Patched minor issues and typos

## v1.1.0
- Changed the command from `/naas` to `/no`
- Converted the command to a registered command with optional @user targeting
- Added context menu command
  - Registered commands do not allow replying to message. Adding this context menu command is he workaround, so that particular messages can still be targeted and replied to with a rejection
- Add "Author" field to the embed to display username and avatar of who triggered the command(s)
- Fixed: Input control stuck in the bot and not returning to normal.

## v1.0.0
- Initial creation of project
