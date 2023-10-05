"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicQueue = void 0;
const events_1 = require("events");
/**
 * Represents a music queue for a specific guild.
 */
class MusicQueue {
    /**
     * The music queue.
     */
    queue;
    /**
     * The event emitter for the music queue.
     */
    emitter;
    /**
     * Creates a new MusicQueue instance for the specified guild.
     * @param guild_id The ID of the guild.
     */
    constructor() {
        this.queue = new Map();
        this.emitter = new events_1.EventEmitter();
    }
    /**
     * Add music to the queue.
     * @param guildId The ID of the guild.
     * @param music The music item to add.
    */
    set(guildId, music) {
        if (!this.queue.has(guildId)) {
            this.queue.set(guildId, []);
        }
        this.queue.get(guildId)?.push(music);
        this.emitter.emit('set', guildId, music);
    }
    /**
     * Skip the currently playing song.
     * @param guildId The ID of the guild.
     */
    skip(guildId) {
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
    next(guildId) {
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
    remove(guildId) {
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
    clear(guildId) {
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
    get(guildId) {
        return this.queue.get(guildId) ?? [];
    }
    /**
     * Get the length of the music queue.
     * @param guildId The ID of the guild.
     */
    length(guildId) {
        return this.queue.get(guildId)?.length || 0;
    }
    /**
     * Subscribe to a music queue event.
     * @param event The event to subscribe to.
     * @param listener A callback function to handle the event.
     */
    on(event, listener) {
        this.emitter.on(event, listener);
        return this;
    }
}
exports.MusicQueue = MusicQueue;
