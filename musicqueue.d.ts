import { AudioResource } from '@discordjs/voice';
/**
 * Enum representing music queue events.
 */
declare enum MusicQueueEvent {
    set = 'set',
    skip = 'skip',
    next = 'next',
    remove = 'remove',
    clear = 'clear'
}
/**
 * Interface representing a music item with an audio resource and additional data.
 */
interface Music<T> {
    audio: AudioResource;
    data: T;
}
/**
 * Represents a music queue for a specific guild.
 */
declare class MusicQueue<T> {
    /**
     * The music queue.
     */
    private queue: Map<string, Music<T>[]>;
    /**
     * The event emitter for the music queue.
     */
    private emitter: import('events').EventEmitter;
    /**
     * The ID of the guild.
     */
    private guild: string;
    /**
     * Creates a new MusicQueue instance for the specified guild.
     * @param guild_id The ID of the guild.
     */
    constructor(guild_id: string);

    /**
     * Add music to the queue.
     * @param music The music item to add.
     */
    set(music: Music<T>): void;

    /**
     * Skip the currently playing song.
     */
    skip(): void;

    /**
     * Play the next song in the queue.
     */
    next(): void;

    /**
     * Remove the currently playing song from the queue.
     */
    remove(): void;

    /**
     * Clear the entire music queue.
     */
    clear(): void;

    /**
     * Get the current music queue for the guild.
     * @returns An array of music items.
     */
    get(): Music<T>[];

    /**
     * Get the length of the music queue.
     * @returns The number of music items in the queue.
     */
    length(): number;

    /**
     * Subscribe to a music queue event.
     * @param event The event to subscribe to.
     * @param listener A callback function to handle the event.
     */
    on(
        event: MusicQueueEvent,
        listener: (guildId: string, song: Music<T>[]) => void
    ): this;
}

export = MusicQueue;