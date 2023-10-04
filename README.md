# MusicQueue Class

The `MusicQueue` class is a TypeScript and Javascript class for managing a music queue in a Discord bot. It is designed to handle a queue of music items associated with a specific guild. This class provides methods for adding music to the queue, skipping, playing the next song, removing songs, and clearing the entire queue. It also emits events to notify external code about queue-related actions.

## Installation

To install the `MusicQueue` class, run the following command:

```bash
npm install ds-musicqueue
```

## Usage

Here's a basic example of how to use the `MusicQueue` class:

```typescript
import { MusicQueue, MusicQueueEvent } from './MusicQueue'; // Replace with the actual path to the .d.ts file

// Create a MusicQueue instance for a guild
const guildId = 'your_guild_id';
const queue = new MusicQueue<string>(guildId);

// Add music to the queue
const musicItem = {
  audio: audioResource,
  data: 'Song Title',
};
queue.set(musicItem);

// Subscribe to queue events
queue.on(MusicQueueEvent.skip, (guildId, songs) => {
  console.log(`Skipped a song in guild ${guildId}`);
});

// Other queue operations
queue.skip();
queue.next();
queue.remove();
queue.clear();
```

## License
This code is provided under the MIT License. You are free to use and modify it as needed for your projects. See the [LICENSE](LICENSE) file for more information.