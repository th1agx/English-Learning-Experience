/**
 * Infrastructure — animation engine adapter.
 * The single sanctioned import point for GSAP in the whole app
 * (Dependency Inversion). Swapping engines rewrites only this file.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
