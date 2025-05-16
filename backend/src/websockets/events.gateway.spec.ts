import { EventsGateway } from './events.gateway';
import { Logger } from '@nestjs/common';

describe('EventsGateway', () => {
  let gateway: EventsGateway;
  let mockServer: any;
  let mockClient: any;

  beforeEach(() => {
    mockServer = {
      to: jest.fn().mockReturnThis(),
      emit: jest.fn(),
    };
    mockClient = {
      id: 'client1',
      join: jest.fn(),
      leave: jest.fn(),
      emit: jest.fn(),
      to: jest.fn().mockReturnThis(),
    };
    gateway = new EventsGateway();
    gateway.server = mockServer;
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
  });

  it('should handle client connection and disconnection', () => {
    expect(() => gateway.handleConnection(mockClient)).not.toThrow();
    expect(() => gateway.handleDisconnect(mockClient)).not.toThrow();
  });

  it('should join and leave tournament rooms', () => {
    gateway.handleJoinRoom(mockClient, { tournamentId: 't1' });
    expect(mockClient.join).toHaveBeenCalledWith('t1');
    gateway.handleLeaveRoom(mockClient, { tournamentId: 't1' });
    expect(mockClient.leave).toHaveBeenCalledWith('t1');
  });

  it('should join and leave field-specific rooms', () => {
    gateway.handleJoinFieldRoom(mockClient, { fieldId: 'fieldA' });
    expect(mockClient.join).toHaveBeenCalledWith('field_fieldA');
    gateway.handleLeaveFieldRoom(mockClient, { fieldId: 'fieldA' });
    expect(mockClient.leave).toHaveBeenCalledWith('field_fieldA');
  });

  it('should emit to field-specific room using emitToField', () => {
    gateway.emitToField('fieldA', 'match_update', { foo: 123 });
    expect(mockServer.to).toHaveBeenCalledWith('field_fieldA');
    expect(mockServer.to().emit).toHaveBeenCalledWith('match_update', { foo: 123 });
  });

  it('should emit display_mode_change on join if settings exist', () => {
    const settings = { tournamentId: 't1', displayMode: 'match', updatedAt: Date.now() };
    (gateway as any).audienceDisplaySettings.set('t1', settings as any);
    gateway.handleJoinRoom(mockClient, { tournamentId: 't1' });
    expect(mockClient.emit).toHaveBeenCalledWith('display_mode_change', settings);
  });

  it('should broadcast match, score, timer, match state, display mode, and announcement updates', () => {
    const payload = { tournamentId: 't1' };
    gateway.handleMatchUpdate(mockClient, payload as any);
    expect(mockClient.to).toHaveBeenCalledWith('t1');
    expect(mockClient.to().emit).toHaveBeenCalledWith('match_update', payload);

    gateway.handleScoreUpdate(mockClient, payload as any);
    expect(mockClient.to().emit).toHaveBeenCalledWith('score_update', payload);

    gateway.handleTimerUpdate(mockClient, payload as any);
    expect(mockClient.to().emit).toHaveBeenCalledWith('timer_update', payload);

    gateway.handleMatchStateChange(mockClient, payload as any);
    expect(mockClient.to().emit).toHaveBeenCalledWith('match_state_change', payload);

    gateway.handleDisplayModeChange(mockClient, { ...payload, displayMode: 'match', updatedAt: Date.now() } as any);
    expect(mockServer.to).toHaveBeenCalledWith('t1');
    expect(mockServer.to().emit).toHaveBeenCalledWith('display_mode_change', expect.objectContaining({ tournamentId: 't1' }));

    gateway.handleAnnouncement(mockClient, payload as any);
    expect(mockClient.to().emit).toHaveBeenCalledWith('announcement', payload);
  });

  it('should start, pause, and reset timers correctly', () => {
    jest.useFakeTimers();
    const payload = { tournamentId: 't1', duration: 2000, remaining: 2000, isRunning: false };
    gateway.handleStartTimer(mockClient, { ...payload });
    expect(gateway.hasActiveTimer('t1')).toBe(true);
    expect(mockServer.to().emit).toHaveBeenCalledWith('timer_update', expect.objectContaining({ tournamentId: 't1', isRunning: true }));
    jest.advanceTimersByTime(2000);
    jest.runOnlyPendingTimers();
    expect(gateway.hasActiveTimer('t1')).toBe(false);
    gateway.handlePauseTimer(mockClient, payload);
    expect(mockServer.to().emit).toHaveBeenCalledWith('timer_update', expect.objectContaining({ isRunning: false }));
    gateway.handleResetTimer(mockClient, payload);
    expect(mockServer.to().emit).toHaveBeenCalledWith('timer_update', expect.objectContaining({ remaining: 2000, isRunning: false }));
    jest.useRealTimers();
  });

  it('should broadcast to tournament and all clients', () => {
    gateway.broadcastToTournament('t1', 'event', { foo: 1 });
    expect(mockServer.to).toHaveBeenCalledWith('t1');
    expect(mockServer.to().emit).toHaveBeenCalledWith('event', { foo: 1 });
    gateway.broadcastEvent('event', { bar: 2 });
    expect(mockServer.emit).toHaveBeenCalledWith('event', { bar: 2 });
  });

  it('should clear previous timers on start, pause, and reset', () => {
    jest.useFakeTimers();
    const payload = { tournamentId: 't1', duration: 1000, remaining: 1000, isRunning: false };
    gateway.handleStartTimer(mockClient, payload);
    expect(gateway.hasActiveTimer('t1')).toBe(true);
    gateway.handleStartTimer(mockClient, payload);
    expect(gateway.hasActiveTimer('t1')).toBe(true);
    gateway.handlePauseTimer(mockClient, payload);
    expect(gateway.hasActiveTimer('t1')).toBe(false);
    gateway.handleStartTimer(mockClient, payload);
    gateway.handleResetTimer(mockClient, payload);
    expect(gateway.hasActiveTimer('t1')).toBe(false);
    jest.useRealTimers();
  });

  it('should handle edge cases for timer start (remaining < duration)', () => {
    jest.useFakeTimers();
    const payload = { tournamentId: 't1', duration: 5000, remaining: 3000, isRunning: false };
    gateway.handleStartTimer(mockClient, payload);
    expect(gateway.hasActiveTimer('t1')).toBe(true);
    jest.useRealTimers();
  });

  it('should emit match, score, timer, and match state updates to field-specific room if fieldId is present', () => {
    const payload = { fieldId: 'fieldA', tournamentId: 't1', foo: 42 };
    gateway.handleMatchUpdate(mockClient, payload);
    expect(mockServer.to).toHaveBeenCalledWith('field_fieldA');
    expect(mockServer.to().emit).toHaveBeenCalledWith('match_update', payload);

    gateway.handleScoreUpdate(mockClient, payload);
    expect(mockServer.to).toHaveBeenCalledWith('field_fieldA');
    expect(mockServer.to().emit).toHaveBeenCalledWith('score_update', payload);

    gateway.handleTimerUpdate(mockClient, payload);
    expect(mockServer.to).toHaveBeenCalledWith('field_fieldA');
    expect(mockServer.to().emit).toHaveBeenCalledWith('timer_update', payload);

    gateway.handleMatchStateChange(mockClient, payload);
    expect(mockServer.to).toHaveBeenCalledWith('field_fieldA');
    expect(mockServer.to().emit).toHaveBeenCalledWith('match_state_change', payload);
  });

  it('should fallback to tournament room if only tournamentId is present', () => {
    const payload = { tournamentId: 't1', foo: 99 };
    gateway.handleMatchUpdate(mockClient, payload);
    expect(mockClient.to).toHaveBeenCalledWith('t1');
    expect(mockClient.to().emit).toHaveBeenCalledWith('match_update', payload);

    gateway.handleScoreUpdate(mockClient, payload);
    expect(mockClient.to).toHaveBeenCalledWith('t1');
    expect(mockClient.to().emit).toHaveBeenCalledWith('score_update', payload);

    gateway.handleTimerUpdate(mockClient, payload);
    expect(mockClient.to).toHaveBeenCalledWith('t1');
    expect(mockClient.to().emit).toHaveBeenCalledWith('timer_update', payload);

    gateway.handleMatchStateChange(mockClient, payload);
    expect(mockClient.to).toHaveBeenCalledWith('t1');
    expect(mockClient.to().emit).toHaveBeenCalledWith('match_state_change', payload);
  });
});
