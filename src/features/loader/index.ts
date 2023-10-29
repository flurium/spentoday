import { dev } from "$app/environment"
import type { Action } from "svelte/action"

const log = dev ? (...data: any[]) => {} : (...data: any[]) => console.log(data)

/** If want to continue loading then return true. */
type LoadFunction = (version: number) => Promise<boolean>

class ScrollLoader {
  private element: HTMLElement | null = null
  private observer: IntersectionObserver | null = null
  private version = 1
  private isLoading = false

  private loadFunction: LoadFunction
  constructor(
    loadFunction: LoadFunction
    // processingAction: () => Promise<void>
  ) {
    // bullsh*t to make "this" work properly
    this.callback = this.callback.bind(this)
    this.loadFunction = loadFunction
  }

  /**
   * Should be called in action to mount element to observe.
   */
  public mount(element: HTMLElement) {
    this.element = element
    log(this.element)
    this.observer = new IntersectionObserver(this.callback)
    this.observer.observe(this.element)
  }

  /**
   * Should be called during destroing element.
   * Just returt from action.
   */
  public unmount() {
    if (this.element == null || this.observer == null) return
    this.observer.unobserve(this.element)
  }

  // Should it be unmount -> do stuff -> mount?
  public async reset(action: () => Promise<void>) {
    this.version = (this.version + 1) % (Number.MAX_VALUE + 1)
    if (this.element && this.observer) this.observer.unobserve(this.element)
    this.isLoading = true

    await action()

    this.isLoading = false
    if (this.element && this.observer) this.observer.observe(this.element)
  }

  /**
   * Compare your version of request with current one.
   * @param version Local version of request.
   * @returns true if version is different now
   */
  public versionChanged(version: number) {
    return this.version != version
  }

  private async callback(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    if (this.element == null) return

    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i]
      if (!entry.isIntersecting) continue

      if (this.isLoading) continue

      this.isLoading = true

      const operationVersion = this.version
      const continueWork = await this.loadFunction(operationVersion)

      this.isLoading = false

      observer.unobserve(this.element)
      if (continueWork) observer.observe(this.element)
    }
  }
}

export function createScrollLoader(loadFunction: LoadFunction) {
  return new ScrollLoader(loadFunction)
}

export const scrollLoader: Action<HTMLElement, ScrollLoader> = (
  node,
  loader
) => {
  log("mount")
  // the node has been mounted in the DOM
  loader.mount(node)

  return {
    destroy() {
      log("destroy")
      // the node has been removed from the DOM
      loader.unmount()
    }
  }
}
