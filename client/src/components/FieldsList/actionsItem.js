import React from 'react';

/* @Styles */
import styles from './FieldsList.module.css';

export const actionItemsDashboardPage = (
	id,
	intl,
	onOpenFieldClick,
	onOpenUpdateFieldModal,
	onDeleteField
) => [
	<span
		onClick={() => onOpenFieldClick(id)}
		className={styles.actionItem}
		key="list-loadmore-edit"
	>
		{intl.formatMessage({ id: 'open' })}
	</span>,
	<span
		onClick={() => onOpenUpdateFieldModal(id)}
		className={styles.actionItem}
		key="list-loadmore-edit"
	>
		{intl.formatMessage({ id: 'edit' })}
	</span>,
	<span onClick={() => onDeleteField(id)} className={styles.actionItem} key="list-loadmore-more">
		{intl.formatMessage({ id: 'delete' })}
	</span>,
];

export const actionItemsFieldPage = (id, intl, onOpenUpdateFieldModal, onDeleteField) => [
	<span
		onClick={() => onOpenUpdateFieldModal(id)}
		className={styles.actionItem}
		key="list-loadmore-edit"
	>
		{intl.formatMessage({ id: 'edit' })}
	</span>,
	<span onClick={() => onDeleteField(id)} className={styles.actionItem} key="list-loadmore-more">
		{intl.formatMessage({ id: 'delete' })}
	</span>,
];
