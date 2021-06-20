/* @hooks */
import { useEffect, useState } from 'react';

const SCROLL_MEASUREMENT_ERROR = 2;

const useHorizontalScroll = (containerRef) => {
	let scrollingTimeout = null;

	const [scrollState, setScrollState] = useState({
		scrollLeft: 0,
		isScrollPositionAtStart: true,
		isScrollPositionAtEnd: false,
	});

	const setScrollLeft = (scrollLeft) => {
		containerRef.current.scrollTo({
			left: scrollLeft,
			behavior: 'smooth',
		});
	};

	const onScroll = (event) => {
		clearTimeout(scrollingTimeout);
		const { scrollWidth, clientWidth } = containerRef.current;
		const { scrollLeft } = event.currentTarget;

		scrollingTimeout = setTimeout(() => {
			setScrollState({
				scrollLeft,
				isScrollPositionAtStart: scrollLeft === 0,
				isScrollPositionAtEnd:
					scrollLeft + SCROLL_MEASUREMENT_ERROR >= scrollWidth - clientWidth,
			});
		}, 50);
	};

	const preventEventBubbling = (e) => {
		e.stopImmediatePropagation();
	};

	useEffect(() => {
		containerRef.current.addEventListener('scroll', onScroll, false);
		containerRef.current.addEventListener('touchstart', preventEventBubbling, false);

		const { scrollWidth, clientWidth } = containerRef.current;

		if (scrollWidth <= clientWidth) {
			setScrollState((prevState) => ({
				...prevState,
				isScrollPositionAtEnd: true,
			}));
		}

		return () => {
			containerRef.current?.removeEventListener('scroll', onScroll, false);
			containerRef.current?.removeEventListener('touchstart', preventEventBubbling, false);
		};
	}, []);

	return [scrollState, setScrollLeft];
};

export default useHorizontalScroll;
