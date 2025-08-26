import { config } from '../../src/config';

describe('Configuration', () => {
  it('should load configuration values from environment', () => {
    expect(config.nodeEnv).toBeDefined();
    expect(config.port).toBeGreaterThan(0);
    expect(config.database.host).toBeDefined();
    expect(config.database.port).toBeGreaterThan(0);
    expect(config.redis.host).toBeDefined();
    expect(config.redis.port).toBeGreaterThan(0);
  });

  it('should have JWT configuration', () => {
    expect(config.jwt.secret).toBeDefined();
    expect(config.jwt.expiresIn).toBeDefined();
  });

  it('should have external API configuration', () => {
    expect(config.spotify).toBeDefined();
    expect(config.google).toBeDefined();
  });

  it('should have logging configuration', () => {
    expect(config.logging.level).toBeDefined();
  });
});
