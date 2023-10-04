import { EventEmitter } from 'events';
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
     * The ID of the guild.
     */
    private guild: string;
    /**
     * Creates a new MusicQueue instance for the specified guild.
     * @param guild_id The ID of the guild.
     */
    constructor(guild_id: string) {
        this.guild = guild_id;
        this.queue = new Map();
        this.emitter = new EventEmitter();
        if (!this.queue.has(this.guild)) {
            this.queue.set(this.guild, []);
        }
    }
    /**
     * Add music to the queue.
     * @param music The music item to add.
     */
    set(music: Music<T>) {
        this.queue.get(this.guild)?.push(music);
        this.emitter.emit('addSong', this.guild, music)
    }
    /**
     * Skip the currently playing song.
     */
    skip() {
        if (!this.queue.has(this.guild))
            return;
        const queue = this.queue.get(this.guild);
        if (queue && queue.length > 0) {
            queue.shift();
            this.emitter.emit('skip', this.guild, queue[0]);
        }
    }
    /**
     * Play the next song in the queue.
     */
    next() {
        if (!this.queue.has(this.guild))
            return;
        const queue = this.queue.get(this.guild);
        if (queue && queue.length > 0) {
            queue.shift();
            this.emitter.emit('naxt', this.guild, queue[0]);
        }
    }
    /**
    * Remove the currently playing song from the queue.
    */
    remove() {
        if (!this.queue.has(this.guild))
            return;
        const queue = this.queue.get(this.guild);
        if (queue && queue.length > 0) {
            queue.shift();
            this.emitter.emit('remove', this.guild, queue[0]);
        }
    }
    /**
    * Clear the entire music queue.
    */
    clear() {
        if (!this.queue.has(this.guild))
            return;
        const queue = this.queue.get(this.guild);
        if (queue && queue.length > 0) {
            queue.shift();
            this.emitter.emit('clear', this.guild, queue[0]);
        }
    }
    /**
     * Get the current music queue for the guild.
     */
    get() {
        return this.queue.get(this.guild) ?? [];
    }
    /**
     * Get the length of the music queue.
     */
    length() {
        return this.queue.get(this.guild)?.length || 0;
    }
    /**
     * Subscribe to a music queue event.
     * @param event The event to subscribe to.
     * @param listener A callback function to handle the event.
     */
    on(event: MusicQueueEvent,
        listener: (guildId: string, song: Music<T>[]) => void): this {
        this.emitter.on(event, listener);
        return this;
    }
}