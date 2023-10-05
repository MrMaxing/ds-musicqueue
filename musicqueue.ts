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
    audio: AudioResource,
    data: T
}
/**
 * Represents a music queue for a specific guild.
 */
export class MusicQueue<T> {
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
    constructor() {
        this.queue = new Map();
        this.emitter = new EventEmitter();
    }
    /**
     * Add music to the queue.
     * @param guildId The ID of the guild.
     * @param music The music item to add.
    */
    set(guildId: string, music: Music<T>) {
        if (!this.queue.has(guildId)) {
            this.queue.set(guildId, []);
        }
        this.queue.get(guildId)?.push(music);
        this.emitter.emit('set', guildId, music)
    }
    /**
     * Skip the currently playing song.
     * @param guildId The ID of the guild.
     */
    skip(guildId: string) {
        if (!this.queue.has(guildId))
            return;
        const queue = this.queue.get(guildId);
        if (queue && queue.length > 0) {
            queue.shift();
            this.emitter.emit('skip', guildId, queue[0]);
        }
    }
    /**
     * Play the next song in the queue.
     * @param guildId The ID of the guild.
     */
    next(guildId: string) {
        if (!this.queue.has(guildId))
            return;
        const queue = this.queue.get(guildId);
        if (queue && queue.length > 0) {
            queue.shift();
            this.emitter.emit('naxt', guildId, queue[0]);
        }
    }
    /**
    * Remove the currently playing song from the queue.
    * @param guildId The ID of the guild.
    */
    remove(guildId: string) {
        if (!this.queue.has(guildId))
            return;
        const queue = this.queue.get(guildId);
        if (queue && queue.length > 0) {
            queue.shift();
            this.emitter.emit('remove', guildId, queue[0]);
        }
    }
    /**
    * Clear the entire music queue.
    * @param guildId The ID of the guild.
    */
    clear(guildId: string) {
        if (!this.queue.has(guildId))
            return;
        const queue = this.queue.get(guildId);
        if (queue && queue.length > 0) {
            queue.shift();
            this.emitter.emit('clear', guildId, queue[0]);
        }
    }
    /**
     * Get the current music queue for the guild.
     * @param guildId The ID of the guild.
     */
    get(guildId: string) {
        return this.queue.get(guildId) ?? [];
    }
    /**
     * Get the length of the music queue.
     * @param guildId The ID of the guild.
     */
    length(guildId: string) {
        return this.queue.get(guildId)?.length || 0;
    }
    /**
     * Subscribe to a music queue event.
     * @param event The event to subscribe to.
     * @param listener A callback function to handle the event.
     */
    on(event: MusicQueueEvent,
        listener: (guildId: string, song: Music<T>) => void): this {
        this.emitter.on(event, listener);
        return this;
    }
}