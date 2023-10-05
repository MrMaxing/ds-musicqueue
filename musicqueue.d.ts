import { EventEmitter } from 'events';
import { AudioResource } from '@discordjs/voice';
/**
 * Enum representing music queue events.
 */
export declare enum MusicQueueEvent {
    set = 'set',
    skip = 'skip',
    next = 'next',
    remove = 'remove',
    clear = 'clear'
}
/**
 * Interface representing a music item with an audio resource and additional data.
 */
export interface Music<T> {
    audio: AudioResource;
    data: T;
}
/**
 * Represents a music queue for a specific guild.
 */
export declare class MusicQueue<T> {
    /**
     * The music queue.
     */
    private queue: Map<string, Music<T>[]>;
    /**
     * The event emitter for the music queue.
     */
    private emitter: EventEmitter;
    /**
     * Creates a new MusicQueue instance for the specified guild.
     * @param guild_id The ID of the guild.
     */
    constructor();
    /**
     * Add music to the queue.
     * @param guildId The ID of the guild.
     * @param music The music item to add.
     */
    set(guildId: string, music: Music<T>): void;
    /**
     * Skip the currently playing song.
     * @param guildId The ID of the guild.
     */
    skip(guildId: string): void;
    /**
     * Play the next song in the queue.
     * @param guildId The ID of the guild.
     */
    next(guildId: string): void
    /**
     * Remove the currently playing song from the queue.
     * @param guildId The ID of the guild.
     */
    remove(guildId: string): void;
    /**
     * Clear the entire music queue.
     * @param guildId The ID of the guild.
     */
    clear(guildId: string): void;
    /**
     * Get the current music queue for the guild.
     * @param guildId The ID of the guild.
     */
    get(guildId: string): Music<T>[];
    /**
     * Get the length of the music queue.
     * @param guildId The ID of the guild.
     */
    length(guildId: string): number;
    /**
     * Subscribe to a music queue event.
     * @param event The event to subscribe to.
     * @param listener A callback function to handle the event.
     */
    on(event: MusicQueueEvent, listener: (guildId: string, song: Music<T>) => void): this;
}
