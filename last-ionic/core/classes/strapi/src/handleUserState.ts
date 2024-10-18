import RestOutput from "core/classes/utils/RestOutput";

  /**
   * Handle user state validation and state updates.
   * 
   * @param resUser The user object from the response.
   * @param res The full response object.
   * @param formData Form configuration that includes success message details.
   * @returns The RestOutput result (success, warning, danger).
   */
  const handleUserState = (resUser: any, formData: any) => {

    let logged = false;

    if (!resUser.confirmed) {

      return RestOutput.warning({
        header: formData?.onSuccess?.header || 'Not confirmed yet!',
        message: formData?.onSuccess?.message || 'This user is not confirmed',
      });

    } else if (resUser.blocked) {
      return RestOutput.danger({
        header: 'Blocked user!',
        message: 'This user is blocked',
      });
    } else {
      logged = true;
    }

    return RestOutput.success({
      header: formData?.onSuccess?.header || 'Success!',
      message: formData?.onSuccess?.message || 'You logged successfully',
    });
  }

  export default handleUserState