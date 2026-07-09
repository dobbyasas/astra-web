import '@testing-library/jest-dom/vitest'

class MockIntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  configurable: true,
  value: MockIntersectionObserver,
})
